import json
import re
from facebook_scraper import get_posts

# Configuration
PAGES = {
    "schoolNews": "ccnshs303141",
    "scholarsVoice": "100087290154105",
    "tinigIskolar": "61551319650573"
}

def fetch_posts(page_id):
    posts_data = []
    try:
        # Get latest 3 posts
        for post in get_posts(page_id, pages=1, options={"posts_per_page": 3}):
            posts_data.append({
                "id": str(post['post_id']),
                "date": str(post['time'].date()),
                "title": (post['text'][:50] + '...') if len(post['text']) > 50 else post['text'],
                "excerpt": (post['text'][:150] + '...') if len(post['text']) > 150 else post['text'],
                "image": post.get('full_picture', ''),
                "link": post.get('post_url', '')
            })
    except Exception as e:
        print(f"Error scraping {page_id}: {e}")
    return posts_data

def update_tsx():
    file_path = 'src/components/NewsSection.tsx'
    with open(file_path, 'r') as f:
        content = f.read()

    for key, page_id in PAGES.items():
        posts = fetch_posts(page_id)
        # Convert list to JSON string for injection
        new_data = json.dumps(posts, indent=2)
        # Regex to find the specific array and replace it
        pattern = rf"(const {key} = )\[.*?\];"
        content = re.sub(pattern, rf"\1{new_data};", content, flags=re.DOTALL)

    with open(file_path, 'w') as f:
        f.write(content)
    print("NewsSection.tsx updated successfully.")

if __name__ == "__main__":
    update_tsx()
