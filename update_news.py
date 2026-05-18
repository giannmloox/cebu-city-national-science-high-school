import os
import json
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
    text = text.replace('\\', '/').replace('`', "'").replace('"', "'")
    return text[:150].strip()

def fetch_posts(page_url):
    client = ApifyClient(APIFY_TOKEN)
    run = client.actor(ACTOR_ID).call(run_input={"startUrls": [{"url": page_url}], "maxPosts": 3})
    posts_data = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        text = item.get("message") or item.get("text") or "No excerpt"
        raw_date = item.get("createdTime")
        try:
            formatted_date = datetime.fromisoformat(raw_date.replace("Z", "")).strftime("%B %d, %Y")
        except:
            formatted_date = "Unknown Date"
        posts_data.append({
            "id": str(item.get("postId", "")),
            "date": formatted_date,
            "title": (text[:50] + '...') if len(text) > 50 else text,
            "excerpt": sanitize_text(text),
            "image": item.get("fullPicture") or item.get("images", [{}])[0].get("url", ""),
            "link": item.get("url", "")
        })
    print(f"Scraped {len(posts_data)} posts for {page_url}")
    for p in posts_data: print(f" - {p['title']}")
    return posts_data

def update_tsx():
    file_path = 'src/components/NewsSection.tsx'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print("First 500 chars of file:")
    print(content[:500])

    for key, url in PAGES.items():
        posts = fetch_posts(url)
        if not posts: continue
        
        new_data_str = json.dumps(posts, indent=2)
        
        # Searching for the specific array definition
        start_pattern = f"const {key}: NewsItem[] = ["
        start_idx = content.find(start_pattern)
        
        if start_idx == -1:
            print(f"ERROR: Pattern '{start_pattern}' not found in file")
            continue
            
        # Find matching closing bracket
        end_idx = content.find("];", start_idx)
        if end_idx == -1:
            print(f"ERROR: Closing sequence '];' not found for {key}")
            continue
        
        # Build new file content
        content = content[:start_idx + len(start_pattern)] + "\n" + new_data_str + "\n" + content[end_idx:]
        print(f"SUCCESS: {key} array updated")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("File write complete.")

if __name__ == "__main__":
    update_tsx()
