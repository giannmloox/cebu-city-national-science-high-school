#!/usr/bin/env python3
'''Auto-update news sections from Facebook pages via Graph API.
Requires FB_PAGE_TOKEN environment variable.
'''
import os
import re
import json
import datetime
import pathlib
import subprocess
import hashlib
import requests

# Mapping of section name -> Graph API feed URL for the Facebook page.
PAGES = {
    'schoolNews': 'https://graph.facebook.com/v22.0/ccnshs303141/feed',
    'scholarsVoice': 'https://graph.facebook.com/v22.0/100087290154105/feed',
    'tinigIskolar': 'https://graph.facebook.com/v22.0/61551319650573/feed',
}

ACCESS_TOKEN = os.getenv('FB_PAGE_TOKEN')
if not ACCESS_TOKEN:
    raise SystemExit('FB_PAGE_TOKEN environment variable not set')

REPO_ROOT = pathlib.Path(__file__).parent.resolve()
NEWS_DATA_TS = REPO_ROOT / 'src' / 'data' / 'newsData.ts'
PUBLIC_DIR = REPO_ROOT / 'public'

def log(msg: str):
    print(f'[auto_update_news] {msg}')

def safe_filename(url: str) -> str:
    """Generate a short deterministic filename based on the URL.
    Keeps the original extension (or falls back to .jpg).
    """
    h = hashlib.sha256(url.encode()).hexdigest()[:12]
    ext = pathlib.Path(url).suffix or '.jpg'
    return f'{h}{ext}'

def download_image(url: str, dest_dir: pathlib.Path) -> str:
    """Download an image from the given URL into dest_dir.
    Returns the public‑relative path (starting with '/'), or an empty string on failure.
    """
    try:
        resp = requests.get(url, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        log(f'Failed image download {url}: {e}')
        return ''
    dest_dir.mkdir(parents=True, exist_ok=True)
    filename = safe_filename(url)
    path = dest_dir / filename
    with open(path, 'wb') as f:
        f.write(resp.content)
    return '/' + path.relative_to(REPO_ROOT).as_posix()

def fetch_posts(feed_url: str):
    """Fetch up to 3 recent posts from a Facebook page feed.
    Returns a list of dicts with keys: title, excerpt, image, link, date.
    """
    params = {
        'access_token': ACCESS_TOKEN,
        'fields': 'message,full_picture,permalink_url,created_time',
        'limit': 3,
    }
    try:
        resp = requests.get(feed_url, params=params, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        log(f'Failed fetch for {feed_url}: {e}')
        return []
    data = resp.json().get('data', [])
    posts = []
    for item in data:
        message = item.get('message', '')
        title = (message.split('\n')[0] or '').strip()[:70]
        excerpt = ' '.join(message.split('\n')[1:]).strip()[:150]
        img_url = item.get('full_picture', '')
        img_path = download_image(img_url, PUBLIC_DIR) if img_url else ''
        link = item.get('permalink_url', '')
        try:
            dt = datetime.datetime.fromisoformat(item.get('created_time', '').replace('Z', ''))
            date_str = dt.strftime('%B %d, %Y').upper()
        except Exception:
            date_str = datetime.datetime.now().strftime('%B %d, %Y').upper()
        posts.append({
            'title': title,
            'excerpt': excerpt,
            'image': img_path,
            'link': link,
            'date': date_str,
        })
    return posts

def load_current_data():
    """Parse existing newsData.ts and return a mapping of section -> list of items.
    Also returns the raw file text for later replacement.
    """
    raw = NEWS_DATA_TS.read_text(encoding='utf-8')
    sections = {}
    for name in PAGES.keys():
        pattern = rf'export const {name}: NewsItem\[] = \[(.*?)\];'
        m = re.search(pattern, raw, re.DOTALL)
        if not m:
            sections[name] = []
            continue
        block = m.group(1)
        items = []
        for obj in re.findall(r'\{[^}]*\}', block, re.DOTALL):
            json_like = obj.replace('\n', ' ').replace("'", '"')
            json_like = re.sub(r'(\w+):', r'"\1":', json_like)
            json_like = re.sub(r',\s*}', '}', json_like)
            try:
                items.append(json.loads(json_like))
            except json.JSONDecodeError:
                pass
        sections[name] = items
    return sections, raw

def write_updated_data(sections, original_text):
    """Inject the updated arrays back into newsData.ts and write the file.
    Keeps only up to three items per section and assigns sequential IDs.
    """
    updated = original_text
    for name, items in sections.items():
        lines = []
        for i, it in enumerate(items[:3], start=1):
            it['id'] = i
            lines.append(f"    {{ id: {i}, date: '{it.get('date','')}', title: '{it.get('title','')}', excerpt: '{it.get('excerpt','')}', image: '{it.get('image','')}', link: '{it.get('link','')}' }}")
        new_array = f'export const {name}: NewsItem[] = [\n' + ',\n'.join(lines) + '\n];'
        pattern = rf'export const {name}: NewsItem\[] = \[.*?\];'
        updated = re.sub(pattern, new_array, updated, flags=re.DOTALL)
    NEWS_DATA_TS.write_text(updated, encoding='utf-8')
    log('newsData.ts updated')

def main():
    log('Starting auto-update')
    current, original_text = load_current_data()
    changed = False
    for section, feed_url in PAGES.items():
        log(f'Fetching {section}')
        fetched = fetch_posts(feed_url)
        if not fetched:
            continue
        if current.get(section) and fetched[0]['link'] == current[section][0].get('link'):
            log(f'No new post for {section}')
            continue
        # Prepend new post, keep only the newest three
        current[section] = [fetched[0]] + current.get(section, [])[:2]
        changed = True
        log(f'Updated {section}')
    if not changed:
        log('No changes detected, exiting.')
        return
    write_updated_data(current, original_text)
    try:
        subprocess.run(['git', 'add', str(NEWS_DATA_TS), 'public/'], cwd=REPO_ROOT, check=True)
        subprocess.run(['git', 'commit', '-m', 'Auto: update news from Facebook'], cwd=REPO_ROOT, check=True)
        subprocess.run(['git', 'push', 'origin', 'main'], cwd=REPO_ROOT, check=True)
        log('Changes committed and pushed')
    except subprocess.CalledProcessError as e:
        log(f'Git operation failed: {e}')

if __name__ == '__main__':
    main()
