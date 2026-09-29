# PickleStart Taiwan — MASTER PROMPT

You are the coding agent responsible for implementing **PickleStart Taiwan**.

Before changing code, read `PRODUCT_SPEC.md` completely.  
`PRODUCT_SPEC.md` is the source of truth for product behavior.

---

## 1. Product Mission

Build a lightweight, mobile-first Taiwan pickleball starter-kit recommendation website.

The core user promise is:

> 第一次玩匹克球？60 秒算出你真正需要買的裝備。

The product should help beginners decide:

- what they need to buy now;
- what they already own and can reuse;
- what can wait;
- what should be skipped for now;
- whether their total budget is realistic.

The product should reduce unnecessary spending rather than maximize affiliate clicks.

---

## 2. Hard Constraints

Do **not** introduce any of the following unless `PRODUCT_SPEC.md` is deliberately revised first:

- backend server;
- database;
- user accounts;
- authentication;
- AI / LLM API;
- product scraping;
- live pricing;
- user-generated public content;
- social features;
- subscription billing;
- marketplace checkout;
- real-time inventory;
- push notifications.

The MVP must remain deployable as a static website.

---

## 3. Preferred Stack

Use:

- Astro
- TypeScript
- Plain CSS / scoped Astro CSS
- Small client-side TypeScript modules where interaction is required

Avoid React unless there is a clear implementation reason.

Prefer readable code over clever abstractions.

Do not use `any` unless absolutely unavoidable and documented.

---

## 4. Architecture Rules

Keep these concerns separate:

```text
UI
↓
Builder State
↓
Recommendation Engine
↓
Product Data
```

The recommendation engine must:

- be deterministic;
- be testable without a browser;
- contain no DOM manipulation;
- contain no affiliate-specific ranking bias;
- explain insufficient-budget outcomes rather than forcing a recommendation.

Product data must not be hard-coded inside UI components.

Recommendation rules must not be hard-coded inside product data.

---

## 5. Current Implementation Milestone

Do **not** build the whole product at once.

The current milestone is:

> A local Builder that accepts the six answers and produces a correct structured recommendation result using mock product data.

Implement in this order:

1. Core TypeScript types
2. Mock product catalog
3. Pure budget helpers
4. Pure product scoring helpers
5. Pure `buildStarterKit()` recommendation function
6. Automated tests for the required scenarios in `PRODUCT_SPEC.md`
7. Minimal `/builder` interface
8. Render structured result
9. Only then improve visual polish

Do not begin SEO articles, analytics, affiliate integration, or visual polishing until the core recommendation tests pass.

---

## 6. Required Builder Inputs

The six input categories are:

1. Experience
2. Required paddle count
3. Venue
4. Existing equipment
5. Total budget
6. Goal

Use the exact product semantics defined in `PRODUCT_SPEC.md`.

Do not silently modify codes or business rules.

---

## 7. Recommendation Principles

Always follow these priorities:

1. Respect existing equipment.
2. Respect total budget.
3. Cover truly required items first.
4. Avoid unnecessary beginner spending.
5. Return an honest insufficient-budget result when needed.
6. Rank products by user fit, not commission.
7. Never claim a product is “best” unless evidence supports that claim.

A valid result may tell the user to buy less.

---

## 8. Budget Logic

Conceptually:

```text
total budget
− required non-paddle costs
= remaining paddle budget

remaining paddle budget
÷ paddles still needed
= practical per-paddle budget
```

If the required equipment cannot reasonably fit the budget:

- emit a structured warning;
- explain the conflict;
- suggest cost-saving alternatives;
- do not force unrealistic products into the kit.

---

## 9. Testing Requirement

At minimum, implement the required test cases listed in `PRODUCT_SPEC.md`.

Every change to recommendation behavior must add or update tests.

Before claiming completion:

- run tests;
- run Astro build;
- report failures honestly;
- do not say something works unless it was actually checked.

---

## 10. Coding-Agent Working Style

For each implementation task:

1. Read relevant files first.
2. State the files you intend to modify.
3. Make the smallest coherent change.
4. Run appropriate tests.
5. Summarize:
   - what changed;
   - why;
   - test/build result;
   - any assumptions;
   - next recommended step.

Do not rewrite unrelated files.

Do not redesign product requirements because implementation is inconvenient.

If the specification is ambiguous, preserve the simplest interpretation consistent with the product mission and explicitly flag the ambiguity.

---

## 11. User Learning Requirement

The project owner is using this project to learn AI-assisted software development.

When explaining meaningful implementation decisions, prefer concise explanations of:

- what the file does;
- why the design was chosen;
- where to debug if it breaks.

Do not drown the user in syntax explanations unless requested.

---

## 12. Security / Privacy Defaults

- Never collect personal identity data in MVP.
- Never expose private keys.
- Never put secrets in client-side code.
- Affiliate URLs are public links and may live in product data.
- Analytics should be privacy-conscious and added only after the core MVP works.

---

## 13. First Task

Start by inspecting the starter repository and `PRODUCT_SPEC.md`.

Then implement or verify:

- `src/types/index.ts`
- `src/data/products.ts`
- `src/logic/budget.ts`
- `src/logic/scoring.ts`
- `src/logic/recommendation.ts`
- `tests/recommendation.test.ts`

The acceptance condition for this first task is:

> `npm test` passes the recommendation scenarios and `npm run build` succeeds.

Do not proceed to affiliate integration or SEO work yet.
