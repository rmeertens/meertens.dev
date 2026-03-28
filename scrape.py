#!/usr/bin/env python3
"""
Scrape all blog posts from pinchofintelligence.com and save as markdown
files in blog/posts/ with YAML frontmatter.

Usage:
  pip install requests beautifulsoup4 html2text
  python scrape.py
"""

import os
import re
import time
import subprocess
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import html2text

ROOT = Path(__file__).parent
POSTS_DIR = ROOT / "blog" / "posts"
BASE_URL = "https://www.pinchofintelligence.com"

EXCLUDE_PREFIXES = ["/portfolio", "/roland-meertens", "/category", "/tag"]


def fetch(url):
    """Use curl to fetch a URL (works around Python DNS issues)."""
    result = subprocess.run(
        ["curl", "-sL", "--max-time", "30", url],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise ConnectionError(f"curl failed for {url}: {result.stderr}")
    return result.stdout


h2t = html2text.HTML2Text()
h2t.body_width = 0
h2t.unicode_snob = True
h2t.images_as_html = False
h2t.wrap_links = False
h2t.skip_internal_links = True


def get_all_post_urls():
    """Crawl paginated index to collect all post URLs."""
    urls = []
    seen = set()
    page = 1
    MAX_PAGES = 20
    while page <= MAX_PAGES:
        url = BASE_URL if page == 1 else f"{BASE_URL}/page/{page}/"
        print(f"Fetching index page {page}...")
        try:
            html_text = fetch(url)
        except ConnectionError:
            break

        soup = BeautifulSoup(html_text, "html.parser")
        articles = soup.select("article")
        if not articles:
            break

        new_count = 0
        for article in articles:
            link = article.select_one("h1 a, h2 a, .entry-title a")
            if link and link.get("href"):
                href = link["href"]
                if any(href.rstrip("/").endswith(p.rstrip("/")) or p in href for p in EXCLUDE_PREFIXES):
                    continue
                if href not in seen:
                    seen.add(href)
                    urls.append(href)
                    new_count += 1

        if new_count == 0:
            print("  No new posts found, stopping.")
            break

        page += 1
        time.sleep(0.5)

    return urls


def scrape_post(url):
    """Fetch a single post and return (slug, frontmatter_dict, markdown_body)."""
    html_text = fetch(url)
    soup = BeautifulSoup(html_text, "html.parser")

    title_el = soup.select_one("h1.entry-title, article h1, .post-title")
    title = title_el.get_text(strip=True) if title_el else ""

    date_el = soup.select_one("time, .entry-date, .post-date")
    date_str = ""
    if date_el:
        dt = date_el.get("datetime", "")
        if dt:
            date_str = dt[:10]
        else:
            date_str = date_el.get_text(strip=True)

    content_el = soup.select_one(".entry-content, .post-content, article .content")
    if not content_el:
        content_el = soup.select_one("article")
    if not content_el:
        return None

    for nav in content_el.select(".post-navigation, .nav-links, .sharedaddy, .jp-relatedposts"):
        nav.decompose()

    content_html = str(content_el)
    md_body = h2t.handle(content_html).strip()

    parsed = urlparse(url)
    slug = parsed.path.strip("/").split("/")[-1] or "untitled"
    slug = re.sub(r"[^a-z0-9-]", "", slug.lower())

    if not title:
        title = slug.replace("-", " ").title()

    excerpt_plain = re.sub(r"[#*\[\]`>!]", "", md_body)
    first_para = excerpt_plain.strip().split("\n\n")[0].replace("\n", " ").strip()
    excerpt = first_para[:200].rsplit(" ", 1)[0] + "..." if len(first_para) > 200 else first_para

    return slug, {
        "title": title,
        "date": date_str,
        "slug": slug,
        "excerpt": excerpt,
        "original_url": url,
    }, md_body


def save_post(slug, meta, body):
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    lines = ["---"]
    for k, v in meta.items():
        safe_v = v.replace('"', '\\"')
        lines.append(f'{k}: "{safe_v}"')
    lines.append("---")
    lines.append("")
    lines.append(body)

    filepath = POSTS_DIR / f"{slug}.md"
    filepath.write_text("\n".join(lines), encoding="utf-8")


def main():
    urls = get_all_post_urls()
    print(f"\nFound {len(urls)} posts.\n")

    for i, url in enumerate(urls, 1):
        try:
            result = scrape_post(url)
            if result is None:
                print(f"  [{i}/{len(urls)}] SKIP (no content): {url}")
                continue
            slug, meta, body = result
            save_post(slug, meta, body)
            print(f"  [{i}/{len(urls)}] {slug}")
            time.sleep(0.3)
        except Exception as e:
            print(f"  [{i}/{len(urls)}] ERROR {url}: {e}")

    print(f"\nDone — saved to {POSTS_DIR}/")


if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(line_buffering=True)
    main()
