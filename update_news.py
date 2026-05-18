import json
import re
import requests
import os

# Configuration: Apify Actor ID and your API Token
# You must set APIFY_TOKEN as a repository secret on GitHub
APIFY_TOKEN = os.getenv('APIFY_TOKEN')
# Facebook Scraper Actor URL
ACTOR_ID = "apify/facebook-scraper"

PAGES = {
    "schoolNews": "ccnshs303141",
    "scholarsVoice": "100087290154105",
    "tinigIskolar": "61551319650573"
}

def fetch_posts_from_apify(page_id):
    if not APIFY_TOKEN:
        print("Error: APIFY_TOKEN not set.")
        return []
    
    url = f"https://api.apify.com/v2/acts/{ACTOR_ID}/runs?token={APIFY_TOKEN}"
    payload = {
        "facebookUrls": [f"https://www.facebook.com/{page_id}"],
        "resultsLimit": 3
    }
    
    try:
        # Trigger the actor
        run = requests.post(url, json=payload).json()
        run_id = run['data']['id']
        
        # Poll for results (simple version)
        import time
        time.sleep(10) # Wait for scraping
        
        results_url = f"https://api.apify.com/v2/acts/{ACTOR_ID}/runs/{run_id}/dataset/items?token={APIFY_TOKEN}"
        posts = requests.get(results_url).json()
        
        formatted_posts = []
        for post in posts:
            formatted_posts.append({
                "id": post.get('postId', ''),
                "date": post.get('date', '')[:10],
                "title": (post.get('text', '')[:50] + '...') if len(post.get('text', '')) > 50 else post.get('text', ''),
                "excerpt": (post.get('text', '')[:150] + '...') if len(post.get('text', '')) > 150 else post.get('text', ''),
                "image": post.get('images', [{}])[0].get('url', '') if post.get('images') else '',
                "link": post.get('url', '')
            })
        return formatted_posts
    except Exception as e:
        print(f"Error fetching from Apify for {page_id}: {e}")
        return []

def update_tsx():
    file_path = 'src/components/NewsSection.tsx'
    with open(file_path, 'r') as f:
        content = f.read()

    for key, page_id in PAGES.items():
        posts = fetch_posts_from_apify(page_id)
        if not posts: continue
        
        new_data = json.dumps(posts, indent=2)
        pattern = rf"(const {key} = )\[.*?\];"
        content = re.sub(pattern, rf"\1{new_data};", content, flags=re.DOTALL)

    with open(file_path, 'w') as f:
        f.write(content)
    print("NewsSection.tsx updated successfully.")

if __name__ == "__main__":
    update_tsx()
