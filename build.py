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

    if not meta.get("thumbnail"):
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
    about_path = f"{root}/about.html" if root != "." else "about.html"
    home_path = f"{root}/index.html" if root != "." else "index.html"

    def cls(name):
        return ' class="active"' if active == name else ""

    return f"""<header class="site-header">
  <div class="page">
    <a class="site-name" href="{home_path}">\U0001F916 Roland Meertens</a>
    <nav class="site-nav">
      <a href="{home_path}"{cls("home")}>Home</a>
      <a href="{about_path}"{cls("about")}>About me</a>
      <a href="{blog_path}"{cls("blog")}>Blog</a>
      <a href="https://www.youtube.com/@roland_does_things" target="_blank">YouTube</a>
      <a href="https://github.com/rmeertens" target="_blank">GitHub</a>
      <a href="https://linkedin.com/in/rmeertens" target="_blank">LinkedIn</a>
    </nav>
  </div>
</header>"""


def site_footer(root="."):
    return ""


# ---------------------------------------------------------------------------
# Post card (for grid layout on blog index)
# ---------------------------------------------------------------------------

def _prefix_thumb(thumb, prefix):
    """Add a prefix to local thumbnail paths (those starting with 'images/')."""
    if thumb and not thumb.startswith(("http://", "https://")) and prefix:
        return f"{prefix}{thumb}"
    return thumb


def post_card_html(meta, slug_prefix="", thumb_prefix=""):
    slug = meta["slug"]
    title_esc = html.escape(meta["title"])
    excerpt_esc = html.escape(clean_excerpt(meta["excerpt"]))
    date_str = format_date(meta.get("date", ""))
    thumb = _prefix_thumb(meta.get("thumbnail", ""), thumb_prefix)
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
    thumb = _prefix_thumb(meta.get("thumbnail", ""), "../")

    content_html = re.sub(
        r'(src|href)="(images/)',
        r'\1="../images/',
        content_html,
    )

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
# Homepage (blog-focused)
# ---------------------------------------------------------------------------

HIGHLIGHTED_SLUGS = [
    "point-and-snap-for-my-smart-home",
    "building-a-pikachu-tesla-coil",
    "building-a-cupcake-robot",
    "immersive-points-a-virtual-reality-point-cloud-visualisation-tool",
]


def homepage_html(posts):
    css_path = "style.css"

    latest = posts[0] if posts else None
    thumb = ""
    if latest and latest.get("thumbnail"):
        t = _prefix_thumb(latest["thumbnail"], "blog/")
        thumb = f'<img class="featured-thumb" src="{html.escape(t)}" alt="" loading="lazy">'

    featured = ""
    if latest:
        featured = (
            f'<a class="featured-post" href="blog/{latest["slug"]}/index.html">\n'
            f'  <div class="featured-body">\n'
            f'    <span class="featured-label">Latest post</span>\n'
            f'    <h3>{html.escape(latest["title"])}</h3>\n'
            f'    <p>{html.escape(clean_excerpt(latest["excerpt"]))}</p>\n'
            f'    <span class="featured-date">{html.escape(format_date(latest.get("date", "")))}</span>\n'
            f'  </div>\n'
            f'  {thumb}\n'
            f'</a>'
        )

    by_slug = {m["slug"]: m for m in posts}
    highlighted = [by_slug[s] for s in HIGHLIGHTED_SLUGS if s in by_slug]
    highlight_cards = "\n".join(post_card_html(m, slug_prefix="blog/", thumb_prefix="blog/") for m in highlighted)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roland Meertens</title>
  <meta name="description" content="Roland Meertens — ML engineer, builder of curious things.">
  <link rel="stylesheet" href="{css_path}">
  {GTAG}
</head>
<body>
{site_header(css_path, active="home")}
<div class="page">

  <div class="hero hero-with-photo">
    <div class="hero-text">
      <h1>Roland Meertens</h1>
      <p class="lead">
        I'm a machine learning engineer who builds <strong>self-driving cars</strong> at
        <a href="https://wayve.ai" target="_blank">Wayve</a>.
        In my spare time I sometimes build interesting things, and on this
        <a href="blog/index.html">blog</a> I share robots I build, websites I make,
        and other interesting musings.
      </p>
    </div>
    <img class="hero-photo" src="myphoto.jpg" alt="Roland Meertens" onclick="document.getElementById('photo-lightbox').classList.add('open')" style="cursor:zoom-in">
  </div>

  <div id="photo-lightbox" class="photo-lightbox" onclick="this.classList.remove('open')">
    <img src="myphoto.jpg" alt="Roland Meertens">
  </div>

  <div class="follow-me">
    <span class="follow-me-label">Follow me on</span>
    <div class="follow-me-links">
      <a href="https://linkedin.com/in/rmeertens" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn <span class="follow-note">(most active)</span>
      </a>
      <a href="https://www.youtube.com/@roland_does_things" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        YouTube
      </a>
      <a href="https://github.com/rmeertens" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        GitHub
      </a>
      <a href="https://www.infoq.com/profile/Roland-Meertens" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        InfoQ
      </a>
    </div>
  </div>

{featured}

  <div class="section-label">Highlighted posts (<a href="blog/index.html">all posts</a>)</div>
  <div class="post-grid">
{highlight_cards}
  </div>
  <div class="view-all-posts">
    <a href="blog/index.html" class="view-all-btn">View all {len(posts)} posts &rarr;</a>
  </div>

</div>
{site_footer(".")}
</body>
</html>"""


# ---------------------------------------------------------------------------
# Photos page
# ---------------------------------------------------------------------------

def photos_page_html(photos):
    """Generate photos/index.html from a list of photo dicts."""
    css_path = "../style.css"

    if not photos:
        grid = '<p class="photos-empty">No photos yet — check back soon.</p>'
    else:
        items = []
        for p in photos:
            name_esc = html.escape(p["name"])
            thumb_esc = html.escape(p["thumb"])
            full_url_esc = html.escape(p["full_url"])
            items.append(
                f'<a class="photo-item" href="{full_url_esc}" target="_blank" rel="noopener">\n'
                f'  <img src="{thumb_esc}" alt="{name_esc}" loading="lazy">\n'
                f'  <span class="photo-caption">{name_esc}</span>\n'
                f'</a>'
            )
        grid = '<div class="photo-grid">\n' + "\n".join(items) + "\n</div>"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photos — Roland Meertens</title>
  <link rel="stylesheet" href="{css_path}">
  {GTAG}
</head>
<body>
{site_header(css_path, active="photos")}
<div class="page">
  <div class="blog-intro">
    <h1>Photos</h1>
    <p>A selection of photos I've taken. Click any image to open the full resolution version.</p>
  </div>
  {grid}
</div>
<div id="photo-lightbox" class="photo-lightbox" onclick="this.classList.remove('open')">
  <img id="lightbox-img" src="" alt="">
</div>
<script>
  document.querySelectorAll('.photo-item').forEach(function(link) {{
    link.addEventListener('click', function(e) {{
      e.preventDefault();
      var lb = document.getElementById('photo-lightbox');
      document.getElementById('lightbox-img').src = this.href;
      lb.classList.add('open');
    }});
  }});
</script>
</body>
</html>"""


def build_photos_page():
    """Read photos/manifest.json and generate photos/index.html."""
    import json
    photos_dir = ROOT / "photos"
    manifest_path = photos_dir / "manifest.json"

    photos = []
    if manifest_path.exists():
        for e in json.loads(manifest_path.read_text(encoding="utf-8")):
            photos.append({
                "name": e["stem"].replace("-", " ").replace("_", " ").title(),
                "thumb": f"thumbs/{e['stem']}.jpg",
                "full_url": e["full_url"],
            })

    photos_dir.mkdir(exist_ok=True)
    (photos_dir / "index.html").write_text(photos_page_html(photos), encoding="utf-8")
    print(f"  Built: photos/index.html ({len(photos)} photo(s))")


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

    # Phase 4: write homepage
    (ROOT / "index.html").write_text(
        homepage_html(all_posts), encoding="utf-8"
    )
    print(f"  Built: index.html")

    # Phase 5: write photos page (reads from photos/thumbs/ and photos/full/)
    build_photos_page()

    print(f"\nDone — {len(all_posts)} posts built.")


if __name__ == "__main__":
    build()
