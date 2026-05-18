import os
import json
import re
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

def fetch_posts(page_url):
    client = ApifyClient(APIFY_TOKEN)
    run_input = {
        "startUrls": [{"url": page_url}],
        "maxPosts": 3,
    }
    run = client.actor(ACTOR_ID).call(run_input=run_input)
    
    posts_data = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        text = item.get("message") or item.get("text") or "No excerpt"
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
            "title": (text[:50] + '...') if len(text) > 50 else text,
            "excerpt": (text[:150] + '...') if len(text) > 150 else text,
            "image": item.get("fullPicture") or item.get("images", [{}])[0].get("url", ""),
            "link": item.get("url", "")
        })
    return posts_data

def update_tsx():
    file_path = 'src/components/NewsSection.tsx'
    with open(file_path, 'r') as f:
        content = f.read()

    for key, url in PAGES.items():
        posts = fetch_posts(url)
        if not posts: continue
        
        # Replace the array content in NewsSection.tsx
        new_data = json.dumps(posts, indent=2)
        pattern = rf"(const {key} = )\[.*?\];"
        content = re.sub(pattern, rf"\1{new_data};", content, flags=re.DOTALL)

    with open(file_path, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    update_tsx()
