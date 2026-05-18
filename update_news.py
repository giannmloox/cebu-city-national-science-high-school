import os
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

def strip_unicode_bold(text):
    if not text: return ""
    # NFKD normalizes characters, but bold/serif variants are distinct. 
    # A simple way to handle many is to map them or just keep ASCII.
    # This regex approach removes non-ascii characters or you can map specific bold ones.
    text = unicodedata.normalize('NFKD', text)
    return "".join([c for c in text if ord(c) < 128])

def sanitize_text(text, is_title=False):
    text = strip_unicode_bold(text)
    text = text.replace('\\', '/').replace('`', "'").replace('"', "'")
    if is_title:
        return text.split('\n')[0][:50].strip()
    return text[:150].strip()

def fetch_posts(page_url):
    client = ApifyClient(APIFY_TOKEN)
    run = client.actor(ACTOR_ID).call(run_input={"startUrls": [{"url": page_url}], "maxPosts": 3})
    
    posts_data = []
    idx = 1
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        raw_text = item.get("message") or item.get("text") or "No excerpt"
        
        raw_date = item.get("createdTime")
        try:
            formatted_date = datetime.fromisoformat(raw_date.replace("Z", "")).strftime("%B %d, %Y").upper()
        except:
            formatted_date = "MAY 18, 2026"
            
        posts_data.append({
            "id": idx,
            "date": formatted_date,
            "title": sanitize_text(raw_text, is_title=True),
            "excerpt": sanitize_text(raw_text),
            "image": item.get("fullPicture") or "/news-placeholder.jpg",
            "link": item.get("url")
        })
        idx += 1
    return posts_data

def format_ts_array(posts):
    lines = ["  {"]
    for p in posts:
        lines.append(f"    id: {p['id']},")
        lines.append(f"    date: \"{p['date']}\",")
        lines.append(f"    title: \"{p['title']}\",")
        lines.append(f"    excerpt: \"{p['excerpt']}\",")
        lines.append(f"    image: \"{p['image']}\",")
        lines.append(f"    link: \"{p['link']}\",")
        lines.append("  },")
    lines.append("];")
    return "\n".join(lines)

def update_tsx():
    file_path = 'src/components/NewsSection.tsx'
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for key, url in PAGES.items():
        posts = fetch_posts(url)
        if not posts: continue
        
        new_array_content = format_ts_array(posts)
        
        # Exact match pattern to replace from const ... = [ to ];
        pattern = rf"(const {key}: NewsItem\[\] = )\[.*?\];"
        content = re.sub(pattern, lambda m: m.group(1) + " [" + new_array_content, content, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_tsx()
