#!/usr/bin/env python3
"""
Fetch photos from S3 bucket rolands-nice-photos, generate thumbnails locally,
and write photos/manifest.json for the static site build.

Full-resolution photos are NOT downloaded — they are linked directly from S3.

Usage:
  python fetch_photos.py

The bucket must be publicly readable (no credentials needed).

Installs:
  pip install boto3 Pillow
"""

import io
import json
import urllib.request
from pathlib import Path

try:
    import boto3
    import botocore
    import botocore.config
except ImportError:
    print("Install boto3: pip install boto3")
    raise

try:
    from PIL import Image, ImageOps
except ImportError:
    print("Install Pillow: pip install Pillow")
    raise

BUCKET = "rolands-nice-photos"
S3_BASE_URL = f"https://{BUCKET}.s3.amazonaws.com"
ROOT = Path(__file__).parent
PHOTOS_DIR = ROOT / "photos"
THUMBS_DIR = PHOTOS_DIR / "thumbs"

THUMB_MAX = 600
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def make_thumbnail(key: str, stem: str):
    """Stream photo from S3 and save a thumbnail locally."""
    thumb_path = THUMBS_DIR / f"{stem}.jpg"
    if thumb_path.exists():
        print(f"  Skipping thumbnail for {key} (already exists)")
        return

    url = f"{S3_BASE_URL}/{urllib.request.quote(key)}"
    print(f"  Thumbnailing {key} ...")
    with urllib.request.urlopen(url) as resp:
        data = resp.read()

    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    img.thumbnail((THUMB_MAX, THUMB_MAX), Image.LANCZOS)
    img.save(thumb_path, "JPEG", quality=82, optimize=True)
    print(f"  Thumbnail → {thumb_path.name}")


def fetch_photos():
    PHOTOS_DIR.mkdir(exist_ok=True)
    THUMBS_DIR.mkdir(exist_ok=True)

    s3 = boto3.client("s3", config=botocore.config.Config(signature_version=botocore.UNSIGNED))

    paginator = s3.get_paginator("list_objects_v2")
    keys = []
    for page in paginator.paginate(Bucket=BUCKET):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            if Path(key).suffix.lower() in IMAGE_EXTS:
                keys.append(key)

    if not keys:
        print("No image files found in bucket.")
        return []

    print(f"Found {len(keys)} photo(s) in s3://{BUCKET}")

    photos = []
    for key in sorted(keys):
        stem = Path(key).stem
        make_thumbnail(key, stem)
        photos.append({
            "stem": stem,
            "full_url": f"{S3_BASE_URL}/{urllib.request.quote(key)}",
        })

    return photos


if __name__ == "__main__":
    photos = fetch_photos()
    manifest_path = PHOTOS_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(photos, indent=2), encoding="utf-8")
    print(f"\nThumbnails for {len(photos)} photo(s) in photos/thumbs/")
    print(f"Manifest written to {manifest_path}")
    print("Now run: python build.py")
