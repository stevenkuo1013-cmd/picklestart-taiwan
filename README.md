# PickleStart Taiwan

A low-maintenance, client-side pickleball starter-kit recommendation product for Taiwan beginners.

## Read first

1. `PRODUCT_SPEC.md` — product source of truth
2. `MASTER_PROMPT.md` — instructions for ChatGPT / Codex / Cursor
3. `src/logic/recommendation.ts` — core recommendation engine

## Local setup

```bash
npm install
npm run dev
```

Open the local URL shown by Astro.

## Tests

```bash
npm test
```

## Production build

```bash
npm run build
```

## Current milestone

The current repository intentionally contains:

- strict product types;
- mock product data;
- deterministic recommendation logic;
- budget helpers;
- product scoring;
- eight recommendation test scenarios;
- minimal Astro homepage;
- minimal `/builder` page that prints a structured demo result.

The next milestone is to replace the fixed demo input with the six-question interactive Builder.

## Important

The product catalog is **mock data only**. Do not launch monetization with these placeholder products.

Do not add a backend, database, AI API, user login, live price scraping, or social features during MVP.
