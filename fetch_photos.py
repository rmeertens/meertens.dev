#!/usr/bin/env python3
"""
Fetch photos from S3 bucket rolands-nice-photos, generate thumbnails,
and write photos/index.html for the static site.

Usage:
  python fetch_photos.py

Requires AWS credentials (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env vars,
or ~/.aws/credentials, or an IAM role).

Installs:
  pip install boto3 Pillow
"""

import io
import os
from pathlib import Path

try:
    import boto3
    import botocore
    import botocore.config
except ImportError:
    print("Install boto3: pip install boto3")
    raise

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install Pillow")
    raise

BUCKET = "rolands-nice-photos"
ROOT = Path(__file__).parent
PHOTOS_DIR = ROOT / "photos"
THUMBS_DIR = PHOTOS_DIR / "thumbs"
FULL_DIR = PHOTOS_DIR / "full"

THUMB_MAX = 600   # max width/height for thumbnail
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def download_and_thumbnail(s3_client, key: str):
    """Download a photo from S3, save full-res and thumbnail locally."""
    ext = Path(key).suffix.lower()
    stem = Path(key).stem

    full_path = FULL_DIR / f"{stem}{ext}"
    thumb_path = THUMBS_DIR / f"{stem}.jpg"

    # Download full resolution
    if not full_path.exists():
        print(f"  Downloading {key} ...")
        obj = s3_client.get_object(Bucket=BUCKET, Key=key)
        data = obj["Body"].read()
        full_path.write_bytes(data)
    else:
        print(f"  Skipping {key} (already downloaded)")
        data = full_path.read_bytes()

    # Generate thumbnail
    if not thumb_path.exists():
        img = Image.open(io.BytesIO(data if not full_path.exists() else full_path.read_bytes()))
        img = img.convert("RGB")
        img.thumbnail((THUMB_MAX, THUMB_MAX), Image.LANCZOS)
        img.save(thumb_path, "JPEG", quality=82, optimize=True)
        print(f"  Thumbnail → {thumb_path.name}")

    return stem, ext


def fetch_photos():
    PHOTOS_DIR.mkdir(exist_ok=True)
    THUMBS_DIR.mkdir(exist_ok=True)
    FULL_DIR.mkdir(exist_ok=True)

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
        stem, ext = download_and_thumbnail(s3, key)
        photos.append({
            "key": key,
            "stem": stem,
            "ext": ext,
            "thumb": f"thumbs/{stem}.jpg",
            "full": f"full/{stem}{ext}",
            "name": stem.replace("-", " ").replace("_", " ").title(),
        })

    return photos


if __name__ == "__main__":
    photos = fetch_photos()
    print(f"\nFetched {len(photos)} photo(s) into photos/")
    print("Now run: python build.py")
