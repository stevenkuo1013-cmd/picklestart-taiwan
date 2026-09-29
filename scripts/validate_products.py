"""Offline product-data validator.

This intentionally uses only Python's standard library.
Expand it after the real product catalog is added.
"""

from pathlib import Path

if __name__ == "__main__":
    product_file = Path(__file__).parents[1] / "src" / "data" / "products.ts"
    if not product_file.exists():
        raise SystemExit("products.ts not found")

    text = product_file.read_text(encoding="utf-8")

    required_tokens = [
        "id:",
        "name:",
        "category:",
        "priceMin:",
        "priceMax:",
        "sourceUrl:",
        "evidenceLevel:",
        "lastVerified:",
        "active:",
    ]

    missing = [token for token in required_tokens if token not in text]

    if missing:
        raise SystemExit(f"Missing expected product fields: {missing}")

    print("Basic product file validation passed.")
