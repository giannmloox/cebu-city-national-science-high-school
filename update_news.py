import json
import os
from datetime import datetime, timezone
from pathlib import Path

from apify_client import ApifyClient


APIFY_TOKEN = os.getenv("APIFY_TOKEN")
ACTOR_ID = "apify/facebook-posts-scraper"
DATA_FILE = Path("src/data/newsData.ts")

PAGES = {
    "schoolNews": "https://www.facebook.com/ccnshs303141",
    "scholarsVoice": "https://www.facebook.com/profile.php?id=100087290154105",
    "tinigIskolar": "https://www.facebook.com/profile.php?id=61551319650573",
}


def clean_text(value, limit):
    """Clean scraped text while preserving Filipino/Cebuano characters."""
    if not value:
        return ""
    text = " ".join(str(value).replace("\\r", "").split())
    return text[:limit].strip()


def format_date(value):
    if not value:
        return datetime.now(timezone.utc).strftime("%B %d, %Y").upper()

    try:
        normalized = str(value).replace("Z", "+00:00")
        return datetime.fromisoformat(normalized).strftime("%B %d, %Y").upper()
    except (TypeError, ValueError):
        return datetime.now(timezone.utc).strftime("%B %d, %Y").upper()


def fetch_posts(client, page_url):
    print(f"Fetching: {page_url}")

    run = client.actor(ACTOR_ID).call(
        run_input={
            "startUrls": [{"url": page_url}],
            "maxPosts": 3,
        }
    )

    posts = []
    dataset = client.dataset(run["defaultDatasetId"])

    for index, item in enumerate(dataset.iterate_items(), start=1):
        if len(posts) >= 3:
            break

        raw_text = item.get("message") or item.get("text") or ""
        title = clean_text(raw_text.split("\n")[0] if raw_text else "CCNSHS News", 100)
        excerpt = clean_text(raw_text, 180)

        link = (
            item.get("url")
            or item.get("permalinkUrl")
            or item.get("postUrl")
            or ""
        )

        image = (
            item.get("fullPicture")
            or item.get("image")
            or "/news-placeholder.jpg"
        )

        posts.append(
            {
                "id": index,
                "date": format_date(
                    item.get("createdTime")
                    or item.get("timestamp")
                    or item.get("date")
                ),
                "title": title or "CCNSHS News",
                "excerpt": excerpt or "Read the full post on Facebook.",
                "image": image,
                "link": link,
            }
        )

    if not posts:
        raise RuntimeError(f"No posts were returned for {page_url}")

    print(f"  Found {len(posts)} posts")
    return posts


def ts_string(value):
    # JSON encoding produces a valid quoted TypeScript string and safely
    # handles quotes, backslashes, newlines, and Unicode.
    return json.dumps(value, ensure_ascii=False)


def render_array(posts):
    lines = ["["]

    for post in posts:
        lines.extend(
            [
                "  {",
                f"    id: {post['id']},",
                f"    date: {ts_string(post['date'])},",
                f"    title: {ts_string(post['title'])},",
                f"    excerpt: {ts_string(post['excerpt'])},",
                f"    image: {ts_string(post['image'])},",
                f"    link: {ts_string(post['link'])},",
                "  },",
            ]
        )

    lines.append("];")
    return "\n".join(lines)


def write_news_data(all_posts):
    output = ['import { NewsItem } from "../types";', ""]

    for key in PAGES:
        output.append(f"export const {key}: NewsItem[] = {render_array(all_posts[key])}")
        output.append("")

    DATA_FILE.write_text("\n".join(output), encoding="utf-8")


def main():
    if not APIFY_TOKEN:
        raise RuntimeError(
            "APIFY_TOKEN is missing. Add it under GitHub Settings → "
            "Secrets and variables → Actions."
        )

    client = ApifyClient(APIFY_TOKEN)

    # Fetch every section before writing anything. If one source fails,
    # the existing news data is left untouched instead of being partially
    # overwritten.
    all_posts = {}
    for key, url in PAGES.items():
        all_posts[key] = fetch_posts(client, url)

    write_news_data(all_posts)
    print(f"Updated {DATA_FILE} successfully.")


if __name__ == "__main__":
    main()
