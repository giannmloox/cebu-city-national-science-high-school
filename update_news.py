import os
import json
import re
import unicodedata
from apify_client import ApifyClient
from datetime import datetime

# Configuration
APIFY_TOKEN = os.getenv('APIFY_TOKEN')
ACTOR_ID = "apify/facebook-posts-scraper"

PAGES = {
    "schoolNews": "https://www.facebook.com/ccnshs303141",
    "scholarsVoice": "https://www.facebook.com/profile.php?id=100087290154105",
    "tinigIskolar": "https://www.facebook.com/profile.php?id=61551319650573"
}

def sanitize_text(text):
    if not text: return "No excerpt"
    # Remove unicode special characters (like bold text) by normalizing
    text = unicodedata.normalize('NFKD', text)
    # Replace backslashes and backticks
    text = text.replace('\\', '/').replace('`', "'")
    # Replace double quotes with single quotes
    text = text.replace('"', "'")
    # Limit to 150 characters and strip whitespace
    text = text[:150].strip()
    return text

def fetch_posts(page_url):
    client = ApifyClient(APIFY_TOKEN)
    run_input = {
        "startUrls": [{"url": page_url}],
        "resultsLimit": 3,
    }
    run = client.actor(ACTOR_ID).call(run_input=run_input)
    
    posts_data = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        raw_text = item.get("message") or item.get("text") or "No excerpt"
        
        # Date formatting: MONTH DD, YYYY
        raw_date = item.get("createdTime")
        formatted_date = ""
        try:
            formatted_date = datetime.fromisoformat(raw_date.replace("Z", "")).strftime("%B %d, %Y")
        except:
            formatted_date = "Unknown Date"
            
        posts_data.append({
            "id": item.get("postId", ""),
            "date": formatted_date,
            "title": sanitize_text(raw_text)[:50] + '...',
            "excerpt": sanitize_text(raw_text),
            "image": item.get("fullPicture") or item.get("images", [{}])[0].get("url", ""),
            "link": item.get("url", "")
        })
    return posts_data

def update_tsx():
    file_path = 'src/components/NewsSection.tsx'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for key, url in PAGES.items():
        posts = fetch_posts(url)
        if not posts: continue
        
        # Replace the array content in NewsSection.tsx
        new_data = json.dumps(posts, indent=2)
        # Using lambda in re.sub to avoid escape issues
        pattern = rf"(const {key} = )\[.*?\];"
        content = re.sub(pattern, lambda m: m.group(1) + new_data + ";", content, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_tsx()
