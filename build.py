#!/usr/bin/env python3
"""
Build script for meertens.dev blog.

Reads markdown posts from blog/posts/, generates:
  - blog/index.html                page 1 with featured + card grid
  - blog/page/2/index.html ...     paginated archive
  - blog/<slug>/index.html         individual posts with hero + prev/next nav

Usage:
  python build.py
"""

import re
import html
from pathlib import Path

try:
    import markdown
except ImportError:
    print("Install markdown: pip install markdown")
    raise

ROOT = Path(__file__).parent
POSTS_SRC = ROOT / "blog" / "posts"
BLOG_OUT = ROOT / "blog"

GTAG = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXWYNZC7YH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXWYNZC7YH');
</script>"""

MONTHS = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]


def parse_date(d):
    try:
        parts = d.split("-")
        return int(parts[0]), int(parts[1]), int(parts[2])
    except (ValueError, IndexError):
        return 0, 0, 0


def format_date(d):
    y, m, day = parse_date(d)
    if y == 0:
        return ""
    month = MONTHS[m] if 1 <= m <= 12 else ""
    return f"{month} {day}, {y}"


def clean_excerpt(text):
    text = re.sub(r"\(https?://[^\)]+\)", "", text)
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"!\[.*?\]", "", text)
    text = re.sub(r"\[([^\]]*)\]", r"\1", text)
    text = re.sub(r"[#*`>]", "", text)
    text = re.sub(r"\s{2,}", " ", text).strip()
    return text


_IMG_RE = re.compile(r"!\[[^\]]*\]\((https?://[^\)]+\.(?:jpg|jpeg|png|gif|webp)[^\)]*)\)", re.IGNORECASE)
_YT_LINK_RE = re.compile(r"https?://(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]+)", re.IGNORECASE)


def extract_thumbnail(body):
    m = _IMG_RE.search(body)
    if m:
        return m.group(1)
    m = _YT_LINK_RE.search(body)
    if m:
        return f"https://img.youtube.com/vi/{m.group(1)}/mqdefault.jpg"
    return ""


# ---------------------------------------------------------------------------
# Frontmatter parser
# ---------------------------------------------------------------------------

def parse_post(filepath: Path):
    text = filepath.read_text(encoding="utf-8")
    meta = {}
    body = text

    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            for line in parts[1].strip().splitlines():
                if ":" in line:
                    key, val = line.split(":", 1)
                    meta[key.strip()] = val.strip().strip('"').strip("'")
            body = parts[2].strip()

    meta.setdefault("title", filepath.stem.replace("-", " ").title())
    meta.setdefault("date", "")
    meta.setdefault("slug", filepath.stem)
    meta.setdefault("excerpt", "")

    if not meta["excerpt"]:
        plain = re.sub(r"[#*\[\]`>]", "", body)
        plain = re.sub(r"\(https?://[^\)]+\)", "", plain)
        plain = re.sub(r"https?://\S+", "", plain)
        plain = re.sub(r"!\[.*?\]", "", plain)
        first_para = plain.strip().split("\n\n")[0].replace("\n", " ").strip()
        first_para = re.sub(r"\s{2,}", " ", first_para)
        meta["excerpt"] = first_para[:200].rsplit(" ", 1)[0] + "..." if len(first_para) > 200 else first_para
    else:
        meta["excerpt"] = clean_excerpt(meta["excerpt"])

    meta["thumbnail"] = extract_thumbnail(body)
    return meta, body


def render_markdown(md_text: str) -> str:
    extensions = ["fenced_code", "codehilite", "tables", "smarty", "toc"]
    return markdown.markdown(md_text, extensions=extensions)


_YT_IMG_RE = re.compile(
    r'<a[^>]*href="(https?://(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]+)[^"]*)"[^>]*>'
    r'\s*<img[^>]*src="https?://img\.youtube\.com/[^"]*"[^>]*/?\s*>\s*</a>',
    re.IGNORECASE,
)


def embed_youtube(html_text: str) -> str:
    def _replace_img(m):
        vid = m.group(2)
        return (
            f'<div class="video-embed">'
            f'<iframe src="https://www.youtube-nocookie.com/embed/{vid}" '
            f'allowfullscreen loading="lazy"></iframe></div>'
        )
    return _YT_IMG_RE.sub(_replace_img, html_text)


# ---------------------------------------------------------------------------
# Shared HTML fragments
# ---------------------------------------------------------------------------

def site_header(css_path, active=""):
    root = css_path.replace("style.css", "").rstrip("/") or "."
    blog_path = f"{root}/blog/index.html" if root != "." else "blog/index.html"
    home_path = f"{root}/index.html" if root != "." else "index.html"

    def cls(name):
        return ' class="active"' if active == name else ""

    return f"""<header class="site-header">
  <div class="page">
    <a class="site-name" href="{home_path}">Roland Meertens</a>
    <nav class="site-nav">
      <a href="{home_path}"{cls("home")}>Home</a>
      <a href="{blog_path}"{cls("blog")}>Blog</a>
      <a href="https://github.com/rmeertens" target="_blank">GitHub</a>
      <a href="https://linkedin.com/in/rmeertens" target="_blank">LinkedIn</a>
    </nav>
  </div>
</header>"""


def site_footer(root="."):
    return f'<footer><div class="page">&copy; 2026 Roland Meertens &middot; <a href="{root}/index.html">meertens.dev</a></div></footer>'


# ---------------------------------------------------------------------------
# Post card (for grid layout on blog index)
# ---------------------------------------------------------------------------

def post_card_html(meta, slug_prefix=""):
    slug = meta["slug"]
    title_esc = html.escape(meta["title"])
    excerpt_esc = html.escape(clean_excerpt(meta["excerpt"]))
    date_str = format_date(meta.get("date", ""))
    thumb = meta.get("thumbnail", "")
    href = f"{slug_prefix}{slug}/index.html"

    if thumb:
        img = f'<img class="card-thumb" src="{html.escape(thumb)}" alt="" loading="lazy">'
    else:
        img = '<div class="card-placeholder">&mdash;</div>'

    return (
        f'<a class="post-card" href="{href}">\n'
        f'  {img}\n'
        f'  <div class="card-body">\n'
        f'    <div class="card-title">{title_esc}</div>\n'
        f'    <div class="card-excerpt">{excerpt_esc}</div>\n'
        f'    <div class="card-date">{html.escape(date_str)}</div>\n'
        f'  </div>\n'
        f'</a>'
    )


# ---------------------------------------------------------------------------
# Individual post page
# ---------------------------------------------------------------------------

def _post_nav_html(prev_meta, next_meta):
    """Previous / next post navigation at the bottom of a post."""
    prev_link = ""
    next_link = ""

    if prev_meta:
        prev_link = (
            f'<a class="post-nav-link post-nav-prev" href="../{prev_meta["slug"]}/index.html">\n'
            f'  <span class="post-nav-label">&larr; Previous</span>\n'
            f'  <span class="post-nav-title">{html.escape(prev_meta["title"])}</span>\n'
            f'</a>'
        )

    if next_meta:
        next_link = (
            f'<a class="post-nav-link post-nav-next" href="../{next_meta["slug"]}/index.html">\n'
            f'  <span class="post-nav-label">Next &rarr;</span>\n'
            f'  <span class="post-nav-title">{html.escape(next_meta["title"])}</span>\n'
            f'</a>'
        )

    if not prev_link and not next_link:
        return ""

    return f'<nav class="post-nav">\n{prev_link}\n{next_link}\n</nav>'


def post_page_html(meta, content_html, prev_meta=None, next_meta=None):
    css_path = "../../style.css"
    title_esc = html.escape(meta["title"])
    date_pretty = format_date(meta.get("date", ""))
    thumb = meta.get("thumbnail", "")

    hero_html = ""
    if thumb:
        hero_html = f'<div class="post-hero"><img src="{html.escape(thumb)}" alt="" loading="lazy"></div>'

    nav_html = _post_nav_html(prev_meta, next_meta)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title_esc} — Roland Meertens</title>
  <link rel="stylesheet" href="{css_path}">
  {GTAG}
</head>
<body>
{site_header(css_path, active="blog")}
<div class="page">
  <div class="post-header">
    <div class="post-breadcrumb"><a href="../index.html">Blog</a></div>
    <h1>{title_esc}</h1>
    <div class="post-meta">{html.escape(date_pretty)}</div>
  </div>
  {hero_html}
  <div class="post-content">
    {content_html}
  </div>
  {nav_html}
</div>
{site_footer("../..")}
</body>
</html>"""


# ---------------------------------------------------------------------------
# Blog index (single page, all posts)
# ---------------------------------------------------------------------------

def blog_index_html(posts):
    css_path = "../style.css"

    latest = posts[0] if posts else None
    thumb = ""
    if latest and latest.get("thumbnail"):
        thumb = f'<img class="featured-thumb" src="{html.escape(latest["thumbnail"])}" alt="" loading="lazy">'

    featured = ""
    if latest:
        featured = (
            f'<a class="featured-post" href="{latest["slug"]}/index.html">\n'
            f'  <div class="featured-body">\n'
            f'    <span class="featured-label">Latest post</span>\n'
            f'    <h3>{html.escape(latest["title"])}</h3>\n'
            f'    <p>{html.escape(clean_excerpt(latest["excerpt"]))}</p>\n'
            f'    <span class="featured-date">{html.escape(format_date(latest.get("date", "")))}</span>\n'
            f'  </div>\n'
            f'  {thumb}\n'
            f'</a>'
        )

    remaining = posts[1:] if latest else posts
    cards = "\n".join(post_card_html(m) for m in remaining)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Roland Meertens</title>
  <link rel="stylesheet" href="{css_path}">
  {GTAG}
</head>
<body>
{site_header(css_path, active="blog")}
<div class="page">
<div class="blog-intro">
  <h1>Blog</h1>
  <p>Writing about AI, side projects, and things I find interesting.<br>
  Previously known as <em>Pinch of Intelligence</em>.</p>
</div>

{featured}

<div class="section-label">All posts</div>
<div class="post-grid">
{cards}
</div>
</div>
{site_footer("..")}
</body>
</html>"""


# ---------------------------------------------------------------------------
# Sort / build
# ---------------------------------------------------------------------------

def _sort_key(meta):
    return parse_date(meta.get("date", ""))


def build():
    if not POSTS_SRC.exists():
        print(f"No posts directory found at {POSTS_SRC}")
        return

    md_files = sorted(POSTS_SRC.glob("*.md"))
    if not md_files:
        print("No .md files found.")
        return

    # Phase 1: parse all posts and render markdown
    parsed = []
    for f in md_files:
        meta, body = parse_post(f)
        content_html = render_markdown(body)
        content_html = embed_youtube(content_html)
        parsed.append((meta, content_html))

    # Sort by date descending (newest first)
    parsed.sort(key=lambda x: _sort_key(x[0]), reverse=True)
    all_posts = [m for m, _ in parsed]

    # Phase 2: write individual post pages with prev/next links
    for i, (meta, content_html) in enumerate(parsed):
        prev_meta = all_posts[i - 1] if i > 0 else None
        next_meta = all_posts[i + 1] if i < len(parsed) - 1 else None

        slug = meta["slug"]
        out_dir = BLOG_OUT / slug
        out_dir.mkdir(parents=True, exist_ok=True)

        (out_dir / "index.html").write_text(
            post_page_html(meta, content_html, prev_meta, next_meta),
            encoding="utf-8",
        )
        print(f"  Built: blog/{slug}/")

    # Phase 3: write single blog index
    (BLOG_OUT / "index.html").write_text(
        blog_index_html(all_posts), encoding="utf-8"
    )
    print(f"  Built: blog/index.html")

    print(f"\nDone — {len(all_posts)} posts built.")


if __name__ == "__main__":
    build()
