# PickleStart Taiwan — Product Specification

**Document:** `PRODUCT_SPEC.md`  
**Version:** 0.1.0  
**Status:** MVP Specification  
**Language:** Traditional Chinese (Taiwan) for user-facing copy; English for code identifiers  
**Primary market:** Taiwan  
**Primary device:** Mobile-first responsive web  
**Business model:** Affiliate monetization, starting with low-maintenance outbound referral links  
**Product type:** Static / client-side web application  
**Backend required:** No  
**Account system required:** No  
**AI API required:** No  

---

## 1. Product Summary

### 1.1 Product name

**PickleStart Taiwan**

Working tagline:

> 第一次玩匹克球？60 秒算出你真正需要買的裝備。

### 1.2 Product concept

PickleStart Taiwan is a beginner-focused pickleball starter-kit recommendation website for users in Taiwan.

The product helps a new or early-stage pickleball player answer:

- 我現在真正需要買什麼？
- 哪些東西可以先不用買？
- 我的總預算怎麼分配？
- 我已有的羽球鞋 / 網球鞋 / 球拍能不能繼續使用？
- 幾個人一起開始，需要準備幾支球拍與多少球？
- 室內、戶外、自備球網等場景下，裝備需求有什麼不同？

The main experience is a **6-question Starter Kit Builder** that generates a personalized equipment plan and optionally provides relevant affiliate links.

### 1.3 Core positioning

PickleStart is **not**:

- a general pickleball encyclopedia;
- a live price-comparison engine;
- a marketplace;
- a court-booking platform;
- a social network;
- a coach directory;
- an AI chatbot;
- a real-time product scraper;
- a “Top 10 best paddles” affiliate blog.

PickleStart is:

> A lightweight decision-support tool that helps Taiwan beginners spend less, avoid unnecessary purchases, and build a sensible first pickleball kit.

### 1.4 Differentiation

The main differentiator is:

> **PickleStart explicitly tells users what they do NOT need to buy yet.**

The user should feel that the product is trying to reduce unnecessary spending rather than maximize affiliate clicks.

---

## 2. Product Goals

### 2.1 Primary MVP goals

The MVP must:

1. Launch publicly as a real website.
2. Allow a user to complete the full 6-question Builder without login.
3. Generate a deterministic, explainable starter-kit recommendation.
4. Respect total budget constraints.
5. Reuse existing user equipment where appropriate.
6. Clearly separate:
   - Buy now
   - Already have
   - Optional later
   - Skip for now
7. Recommend a small curated set of products.
8. Support outbound affiliate links.
9. Track anonymized funnel events.
10. Provide three SEO-focused beginner landing pages.
11. Work well on mobile.
12. Require minimal ongoing maintenance.

### 2.2 Business validation goals

Initial validation milestones:

1. Website deployed successfully.
2. First 100 non-owner visitors.
3. First 25 Builder starts.
4. First 10 completed Builder sessions.
5. First affiliate link click.
6. First affiliate-attributed purchase.
7. First cumulative affiliate payout milestone.

Revenue is **not** the primary MVP success criterion.

### 2.3 Portfolio / career goal

The project should be presentable as a real product engineering case study.

A future resume bullet should be supportable by real implementation evidence, for example:

> Designed and launched a mobile-first consumer recommendation platform using AI-assisted development, implementing a deterministic budget-constrained recommendation engine, static content architecture, analytics funnel tracking, SEO, and affiliate monetization.

Do not claim usage or revenue numbers until they are actually measured.

---

## 3. Non-Goals

The following are explicitly out of scope for MVP:

- User accounts
- Authentication
- Password reset
- Cloud database
- Server-side user profiles
- AI / LLM recommendations
- Chatbot
- Real-time product pricing
- Product scraping
- Automated merchant inventory tracking
- User reviews
- Comments
- Community posting
- Court booking
- Coach booking
- Matchmaking
- Live events
- Notifications
- Subscription billing
- Marketplace checkout
- Payment processing
- Mobile app
- Product recommendation based on medical conditions
- Personalized health/injury advice

These must not be added without a deliberate post-MVP decision.

---

## 4. Technical Principles

### 4.1 Architecture

The MVP should be deployable as a static website.

Preferred stack:

- **Astro**
- **TypeScript**
- **Plain CSS** or minimal scoped CSS
- Optional small client-side TypeScript modules
- No React unless a clear implementation need appears
- No backend
- No server database

### 4.2 Deployment

Preferred:

- GitHub repository
- Cloudflare Pages or Vercel

The app should build with a standard static build process.

### 4.3 Client-side only

All Builder answers and recommendation logic should execute locally in the browser.

No personally identifiable information should be requested.

### 4.4 Maintainability over sophistication

Prefer:

- clear rules;
- explicit types;
- small modules;
- readable code;
- deterministic outcomes.

Avoid:

- over-engineering;
- unnecessary frameworks;
- clever abstractions;
- opaque scoring;
- hidden dependencies.

---

## 5. Information Architecture

### 5.1 Required routes

```text
/
├── /builder
├── /guide
│   ├── /beginner-equipment
│   ├── /beginner-budget
│   └── /badminton-shoes
├── /how-we-recommend
├── /about
├── /affiliate-disclosure
└── /privacy
```

### 5.2 Navigation

Primary navigation:

- 首頁
- 建立 Starter Kit
- 新手指南
- 推薦方式

Footer:

- About
- How We Recommend
- Affiliate Disclosure
- Privacy

Keep navigation minimal.

---

## 6. Homepage Specification

### 6.1 Hero

Headline:

> 第一次玩匹克球？

Main statement:

> 60 秒算出你真正需要買的裝備。

Supporting copy:

> 不亂買、不超出預算。告訴你哪些要買、哪些可以先不用買。

Primary CTA:

> 建立我的 Starter Kit

Trust points:

- 免費
- 不需註冊
- 不需上傳個人資料
- 告訴你哪些可以先不用買

### 6.2 Value section

Show four benefits:

- 建議裝備
- 預估總預算
- 已有裝備可沿用
- 暫時不用買的東西

### 6.3 Guide links

Feature the three initial SEO guides:

1. 第一次玩匹克球要買什麼？
2. 匹克球新手要花多少錢？
3. 羽球鞋可以打匹克球嗎？

### 6.4 Disclosure

A compact affiliate disclosure must be visible near monetized sections and linked in footer.

Suggested text:

> 部分商品連結為聯盟行銷連結。若你透過連結完成購買，PickleStart 可能取得少量分潤，不會增加你的購買價格。推薦邏輯以使用者需求與預算為優先。

---

## 7. Starter Kit Builder

### 7.1 UX principles

- One question per screen
- Clear progress indicator
- Large tap targets
- Mobile-first
- No account
- No personal identity fields
- Back button available
- Progress retained during current session
- Results generated immediately after Q6

### 7.2 Required flow

```text
Q1 Experience
↓
Q2 Paddle Requirement
↓
Q3 Venue
↓
Q4 Existing Equipment
↓
Q5 Total Budget
↓
Q6 Goal
↓
Recommendation Engine
↓
Result Page
```

---

## 8. Builder Question Definitions

### Q1 — Experience

User-facing question:

> 你目前是哪種狀態？

Options:

| Label | Code |
|---|---|
| 第一次體驗 | `first_time` |
| 已經玩過幾次 | `few_times` |
| 每週固定打 | `weekly` |
| 想認真進步 / 比賽 | `serious` |

Type:

```ts
type Experience =
  | "first_time"
  | "few_times"
  | "weekly"
  | "serious";
```

---

### Q2 — Required paddle count

User-facing question:

> 這次你總共需要幾支球拍？

Input:

- stepper
- minimum: 1
- maximum: 4
- default: 2

Stored as:

```ts
requestedPaddles: number;
```

This is the total intended number of usable paddles after accounting for existing paddles in Q4.

---

### Q3 — Venue

User-facing question:

> 你主要會在哪裡玩？

Options:

| Label | Code |
|---|---|
| 室內球館 | `indoor` |
| 戶外固定球場 | `outdoor_court` |
| 公園 / 空地，需要自己準備 | `self_setup` |
| 還不知道 | `unknown` |

Type:

```ts
type Venue =
  | "indoor"
  | "outdoor_court"
  | "self_setup"
  | "unknown";
```

---

### Q4 — Existing equipment

User-facing question:

> 你已經有哪些裝備？

Fields:

- Existing pickleball paddles: integer 0–4
- Pickleballs: boolean
- Badminton shoes: boolean
- Tennis shoes: boolean
- Court shoes: boolean
- Existing net / venue provides net: boolean
- None: convenience reset option

Type:

```ts
interface ExistingEquipment {
  paddles: number;
  balls: boolean;
  badmintonShoes: boolean;
  tennisShoes: boolean;
  courtShoes: boolean;
  netAvailable: boolean;
}
```

Rules:

- Existing paddles cannot exceed `requestedPaddles`.
- Selecting “none” resets all existing equipment values.
- Selecting another item unchecks “none”.

---

### Q5 — Total budget

User-facing question:

> 你整套裝備總共想花多少？

Options:

| Label | Internal budget ceiling |
|---|---:|
| NT$1,500 以下 | 1500 |
| NT$1,500–3,000 | 3000 |
| NT$3,000–5,000 | 5000 |
| NT$5,000–8,000 | 8000 |
| NT$8,000+ | 12000 |

Type:

```ts
type BudgetTier =
  | 1500
  | 3000
  | 5000
  | 8000
  | 12000;
```

The 12000 value is an internal planning ceiling, not a promise that the user must spend that amount.

---

### Q6 — Goal

User-facing question:

> 你希望怎麼玩？

Options:

| Label | Code |
|---|---|
| 偶爾跟朋友玩 | `casual` |
| 每週休閒 | `regular` |
| 想慢慢進步 | `improve` |
| 想認真訓練 / 比賽 | `competitive` |

Type:

```ts
type Goal =
  | "casual"
  | "regular"
  | "improve"
  | "competitive";
```

---

## 9. Builder Input Model

```ts
interface BuilderInput {
  experience: Experience;
  requestedPaddles: number;
  venue: Venue;
  existingEquipment: ExistingEquipment;
  budget: BudgetTier;
  goal: Goal;
}
```

---

## 10. Recommendation Output Model

```ts
interface StarterKitResult {
  estimatedMinSpend: number;
  estimatedMaxSpend: number;

  buyNow: RecommendationItem[];
  alreadyHave: RecommendationItem[];
  optionalLater: RecommendationItem[];
  skipForNow: RecommendationItem[];

  productRecommendations: ProductRecommendation[];

  warnings: RecommendationWarning[];
  notes: string[];
}
```

---

## 11. Core Recommendation Rules

The engine must be deterministic and explainable.

### 11.1 Paddle requirement

```ts
paddlesToBuy =
  max(0, requestedPaddles - existingEquipment.paddles);
```

If `paddlesToBuy === 0`:

- Do not recommend a paddle purchase.
- Add paddle to `alreadyHave`.

---

### 11.2 Ball requirement

If user already has pickleballs:

- Add ball to `alreadyHave`.
- Do not recommend ball purchase.

Otherwise:

#### Indoor

```text
venue = indoor
→ recommend indoor balls
```

#### Outdoor court

```text
venue = outdoor_court
→ recommend outdoor balls
```

#### Self setup

```text
venue = self_setup
→ recommend outdoor balls by default
```

#### Unknown

```text
venue = unknown
→ recommend a small starter quantity only
→ clearly explain indoor/outdoor balls differ
```

Do not recommend buying large quantities for first-time users.

---

### 11.3 Shoe rules

Define:

```ts
hasSuitableCourtShoes =
  badmintonShoes ||
  tennisShoes ||
  courtShoes;
```

If true:

- Do not recommend shoes.
- Add footwear to `alreadyHave`.
- Display:

> 你已經有適合側向移動的場地鞋，第一階段不用另外買匹克球專用鞋。

If false:

#### First-time / few-times users

Shoes are **not automatically required**.

Place footwear in `optionalLater` with guidance:

> 第一次體驗可先確認場館規定與現有鞋款。若之後固定打，再考慮有良好側向支撐的場地鞋。

#### Weekly / serious users

Shoes become a higher-priority recommendation.

Never provide injury-prevention guarantees or medical advice.

---

### 11.4 Net rules

If:

```text
venue = indoor
OR
venue = outdoor_court
```

Assume a net is available unless user indicates otherwise in future versions.

Do not recommend portable net.

If:

```text
venue = self_setup
AND
netAvailable = false
```

Portable net becomes a required-cost candidate.

If budget is insufficient for:

- required paddles,
- minimum balls,
- required net,

do not force low-quality recommendations.

Return a budget warning.

Suggested output:

> 你的預算較難一次買齊完整自備裝備。建議先使用已有球網的公共場地，或先借用部分球拍。

---

### 11.5 First-time spending rule

If:

```text
experience = first_time
AND
goal = casual
```

Prefer lower-cost beginner equipment.

Avoid:

- premium paddles;
- paddle bags;
- premium accessories;
- bulk balls;
- unnecessary footwear;
- portable nets unless truly required.

Primary principle:

> Minimize regret and unnecessary first-day spending.

---

### 11.6 Serious user rule

If:

```text
experience = serious
OR
goal = competitive
```

Allow higher-quality equipment recommendations within budget.

Do not automatically consume the entire budget.

---

## 12. Budget Allocation Logic

### 12.1 Principle

Do not allocate a fixed percentage of total budget to paddles.

Use:

```text
Total Budget
− Required Non-Paddle Costs
= Remaining Paddle Budget
```

Then:

```text
Per-Paddle Budget =
Remaining Paddle Budget / paddlesToBuy
```

### 12.2 Minimum required cost calculation

Calculate estimated minimum costs for:

- required balls;
- required portable net;
- required footwear only when applicable;
- other truly required items.

Then determine whether the remaining budget can support the requested number of paddles.

### 12.3 Insufficient budget

If budget cannot satisfy minimum reasonable recommendations:

Return:

```ts
warning.code = "BUDGET_INSUFFICIENT";
```

The UI must explain:

- what caused the conflict;
- approximate minimum realistic budget;
- one or more cost-saving alternatives.

Never hide an insufficient budget state.

---

## 13. Product Recommendation Scoring

The product catalog remains small in MVP.

### 13.1 Scoring goals

Product ranking should prioritize:

1. fit to budget;
2. fit to experience;
3. fit to goal;
4. fit to venue;
5. correct pack size;
6. active / verified status.

### 13.2 Example scoring

Initial scoring proposal:

```text
Budget fit        +4
Experience fit    +3
Goal fit          +3
Venue fit         +2
Pack-size fit     +2
```

Maximum base score: 14.

### 13.3 Budget fit

Products that exceed the practical per-item budget should be heavily penalized or filtered.

Do not recommend a product solely because it has a high affiliate commission.

### 13.4 Recommendation transparency

Every recommended product should display:

- why it fits;
- approximate price band;
- intended user type;
- last verified date when appropriate.

Avoid unsupported language such as:

- 最佳
- 第一名
- 實測最強
- 專家推薦

unless supported by actual evidence.

Preferred language:

> 符合你目前條件的選項

---

## 14. Product Data Model

```ts
type ProductCategory =
  | "paddle"
  | "ball"
  | "shoes"
  | "net";

type EvidenceLevel =
  | "manufacturer_specs"
  | "editorial_research"
  | "hands_on";

interface Product {
  id: string;

  name: string;
  brand: string;
  category: ProductCategory;

  merchant: string;

  priceMin: number;
  priceMax: number;

  experience: Experience[];
  goals: Goal[];

  venue: (
    | "indoor"
    | "outdoor"
    | "both"
  )[];

  packSize: number;

  affiliateUrl?: string;
  sourceUrl: string;

  evidenceLevel: EvidenceLevel;

  lastVerified: string;

  active: boolean;

  shortReason: string;

  tags?: string[];
}
```

### 14.1 Optional future paddle-specific fields

Do not require these in MVP unless useful:

```ts
interface PaddleSpecs {
  weightClass?: "light" | "medium" | "heavy";
  coreThicknessMm?: number;
  shape?: "widebody" | "standard" | "elongated";
  style?: "control" | "all_court" | "power";
}
```

---

## 15. Initial Catalog Size

MVP target:

| Category | Approx. count |
|---|---:|
| Ultra-entry paddles | 2 |
| Entry paddles | 3 |
| Two-paddle starter sets | 2 |
| Mid-range paddles | 2 |
| Outdoor balls | 2 |
| Indoor balls | 1 |
| Entry court shoes | 2 |
| Portable net | 1 |
| **Total** | **~15** |

Do not exceed ~20 products before launch without strong reason.

---

## 16. Result Page Specification

Results should be displayed in this order:

### 16.1 Summary card

Display:

- Total budget
- Estimated spend range
- Estimated unused budget where meaningful

Example:

```text
你的預算
NT$3,000

建議花費
NT$2,200–2,700

預計保留
NT$300–800
```

### 16.2 Buy now

Show only items considered necessary for the user’s stated scenario.

### 16.3 Already have

Explicitly recognize useful existing equipment.

This is a trust-building feature.

### 16.4 Optional later

Items that could become valuable after the user plays more frequently.

### 16.5 Skip for now

This section is mandatory where applicable.

Potential examples:

- high-end paddle;
- premium paddle bag;
- portable net;
- dedicated pickleball shoes;
- bulk balls.

### 16.6 Product cards

Each card shows:

- Product name
- Approximate price band
- Why it fits
- Merchant
- CTA: `查看目前價格`
- Affiliate disclosure where applicable

### 16.7 Restart

Provide:

> 重新建立 Starter Kit

No account is needed to restart.

---

## 17. Initial SEO Content

Only three SEO guide pages are required before MVP launch.

### 17.1 `/guide/beginner-equipment`

Working title:

> 第一次玩匹克球要買什麼？新手裝備完整清單

Primary intent:

- beginner equipment;
- what to buy;
- what not to buy.

CTA:

> 建立我的 Starter Kit

---

### 17.2 `/guide/beginner-budget`

Working title:

> 第一次玩匹克球要花多少錢？NT$2,000／3,000／5,000 入門預算

Primary intent:

- starter budget;
- budget allocation;
- different spending tiers.

This page should strongly connect to the Builder.

---

### 17.3 `/guide/badminton-shoes`

Working title:

> 羽球鞋可以打匹克球嗎？哪些鞋可以先不用買

Primary intent:

- reuse existing equipment;
- court-shoe decision;
- avoid unnecessary spending.

Avoid medical claims.

---

## 18. SEO Requirements

Every public page should include:

- unique `<title>`;
- unique meta description;
- canonical URL;
- semantic headings;
- mobile-friendly layout;
- internal links;
- descriptive anchor text;
- sitemap;
- robots.txt;
- Open Graph metadata.

Avoid:

- keyword stuffing;
- mass-generated pages;
- duplicated templated articles;
- misleading claims;
- fake reviews;
- unsupported “best” rankings.

---

## 19. Affiliate Requirements

### 19.1 Link attributes

Paid / affiliate outbound links should use:

```html
rel="sponsored"
```

Where appropriate also consider:

```html
target="_blank"
```

with safe rel attributes.

### 19.2 Disclosure

Disclosure must be accessible from:

- footer;
- result page;
- monetized guide pages.

### 19.3 Commercial neutrality

Recommendation ranking must not depend directly on affiliate commission percentage.

If a product lacks an affiliate relationship but is clearly a better fit, the architecture must allow it to be recommended.

---

## 20. Analytics

Use a lightweight privacy-conscious analytics tool where practical.

Minimum event model:

```text
homepage_view
builder_started

builder_q1_completed
builder_q2_completed
builder_q3_completed
builder_q4_completed
builder_q5_completed
builder_q6_completed

builder_completed
result_viewed

affiliate_clicked
guide_viewed
```

### 20.1 Affiliate click metadata

Track non-personal fields only, for example:

```ts
{
  productId,
  merchant,
  category,
  resultRank
}
```

Do not log sensitive user data.

### 20.2 Core funnel

```text
Visitor
↓
Builder Started
↓
Builder Completed
↓
Result Viewed
↓
Affiliate Clicked
↓
External Purchase (merchant-side attribution)
```

---

## 21. Privacy

MVP must not request:

- name;
- email;
- phone;
- address;
- date of birth;
- health status;
- payment details.

Builder inputs are not inherently personal identity data and should remain local unless anonymous aggregate analytics are deliberately added.

Privacy page should clearly state:

- no account required;
- no personal profile stored;
- use of analytics, if any;
- use of affiliate links;
- external merchant privacy policies apply after leaving PickleStart.

---

## 22. Accessibility

Minimum requirements:

- keyboard navigable Builder;
- visible focus states;
- readable font sizes;
- sufficient contrast;
- form controls with labels;
- buttons not dependent on color alone;
- semantic HTML;
- alt text for meaningful images.

---

## 23. Performance

Target:

- fast static load;
- minimal JavaScript;
- optimized images;
- no large client-side framework unless necessary.

Recommended target:

- Lighthouse Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

Treat these as targets, not hard launch blockers if one category is slightly below target for a known reason.

---

## 24. Suggested Repository Structure

```text
picklestart/
├── public/
│   ├── favicon.svg
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── BuilderProgress.astro
│   │   ├── ProductCard.astro
│   │   └── ResultSection.astro
│   │
│   ├── data/
│   │   └── products.ts
│   │
│   ├── logic/
│   │   ├── recommendation.ts
│   │   ├── scoring.ts
│   │   └── budget.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── builder.astro
│   │   ├── about.astro
│   │   ├── how-we-recommend.astro
│   │   ├── affiliate-disclosure.astro
│   │   ├── privacy.astro
│   │   └── guide/
│   │       ├── beginner-equipment.astro
│   │       ├── beginner-budget.astro
│   │       └── badminton-shoes.astro
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── types/
│       └── index.ts
│
├── scripts/
│   ├── validate_products.py
│   └── test_recommendations.py
│
├── tests/
│   └── recommendation.test.ts
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── PRODUCT_SPEC.md
└── README.md
```

---

## 25. Python Utility Scope

Python is allowed and encouraged for offline utilities.

Potential scripts:

### `validate_products.py`

Checks:

- duplicate IDs;
- missing URLs;
- invalid price ranges;
- inactive products;
- invalid category values;
- missing verification dates.

### `test_recommendations.py`

Optional offline QA helper for generating test cases and inspecting output.

Python must not be required for normal website visitors.

---

## 26. Required Recommendation Test Cases

The MVP must include automated or documented tests covering at least the following.

### Test 1 — Two first-time outdoor players

Input:

```text
experience: first_time
requestedPaddles: 2
venue: outdoor_court
existing paddles: 0
balls: false
badminton shoes: true
budget: 3000
goal: casual
```

Expected behavior:

- Recommend 2 entry-level paddles.
- Recommend small quantity outdoor balls.
- Do not recommend shoes.
- Do not recommend portable net.
- Skip premium paddle / bag.

---

### Test 2 — Existing paddles

Input:

```text
requestedPaddles: 2
existing paddles: 2
```

Expected:

- No paddle purchase recommended.

---

### Test 3 — Self setup with no net

Input:

```text
venue: self_setup
netAvailable: false
```

Expected:

- Portable net considered required.

---

### Test 4 — Insufficient budget

Input:

```text
requestedPaddles: 4
venue: self_setup
netAvailable: false
budget: 1500
```

Expected:

- Return budget insufficient warning.
- Recommend alternative such as using a venue with an existing net or borrowing equipment.
- Do not recommend four unrealistically cheap paddles.

---

### Test 5 — Weekly player without court shoes

Input:

```text
experience: weekly
badmintonShoes: false
tennisShoes: false
courtShoes: false
```

Expected:

- Shoes become recommended / higher priority.

---

### Test 6 — First-time player without court shoes

Expected:

- Shoes are not automatically mandatory.
- Guidance suggests checking venue and upgrading later if playing regularly.

---

### Test 7 — Unknown venue

Expected:

- Avoid overcommitting to indoor or outdoor bulk balls.
- Explain difference.
- Recommend minimal starter quantity or defer.

---

### Test 8 — Serious player with larger budget

Expected:

- Mid-range paddle options may outrank ultra-entry products.
- Do not automatically spend full budget.

---

## 27. MVP UI Wireframes

### 27.1 Homepage

```text
┌────────────────────────────┐
│ PickleStart          Guide │
├────────────────────────────┤
│                            │
│ 第一次玩匹克球？            │
│                            │
│ 60 秒算出你真正             │
│ 需要買的裝備。              │
│                            │
│ 不亂買、不超出預算。        │
│                            │
│ [ 建立我的 Starter Kit ]   │
│                            │
│ ✓ 免費                     │
│ ✓ 不需註冊                 │
│ ✓ 告訴你哪些不用買          │
│                            │
├────────────────────────────┤
│ 你會得到                   │
│                            │
│ 🎾 建議裝備                │
│ 💰 預估預算                │
│ ✓ 已有裝備可沿用           │
│ ✕ 暫時不用買               │
├────────────────────────────┤
│ 新手指南                   │
│                            │
│ [第一次要買什麼]           │
│ [NT$3000 怎麼買]           │
│ [羽球鞋可以穿嗎]           │
├────────────────────────────┤
│ About / Disclosure / Privacy│
└────────────────────────────┘
```

### 27.2 Builder screen

```text
┌────────────────────────────┐
│ PickleStart                │
│                            │
│ ●━━━━○━━━━○━━━━○━━━━○━━━━○ │
│                            │
│ Question 1 of 6            │
│                            │
│ 你目前是哪種狀態？          │
│                            │
│ ┌────────────────────────┐ │
│ │ 🌱 第一次體驗          │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ 🎾 已經玩過幾次        │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ 📅 每週固定打          │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ 🏆 想認真進步 / 比賽   │ │
│ └────────────────────────┘ │
│                            │
│ ← Back                Next │
└────────────────────────────┘
```

### 27.3 Result screen

```text
┌────────────────────────────┐
│ Your PickleStart Kit       │
│                            │
│ 你的預算                   │
│ NT$3,000                   │
│                            │
│ 建議花費                   │
│ NT$2,200–2,700             │
│                            │
│ 預計保留                   │
│ NT$300–800                 │
├────────────────────────────┤
│ 🟢 現在需要                │
│                            │
│ Paddle × 2                 │
│ Outdoor Balls × 3          │
├────────────────────────────┤
│ ✓ 你已經有                 │
│                            │
│ 羽球鞋                     │
│ 不需要另外購買球鞋。       │
├────────────────────────────┤
│ ⏳ 暫時不用買              │
│                            │
│ ✕ Bag                      │
│ ✕ Portable Net             │
│ ✕ Premium Paddle           │
├────────────────────────────┤
│ 符合你的選項               │
│                            │
│ ┌────────────────────────┐ │
│ │ Paddle A               │ │
│ │ NT$800–1,200           │ │
│ │ ✓ Beginner             │ │
│ │ ✓ Casual               │ │
│ │ [查看目前價格 →]       │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

---

## 28. Visual Direction

The first version should feel:

- clean;
- trustworthy;
- beginner-friendly;
- lightweight;
- modern;
- not aggressively commercial.

Avoid:

- flashing sale badges;
- countdown timers;
- “BEST!!!” copy;
- fake scarcity;
- dense product grids;
- excessive sports imagery.

Visual references:

- generous whitespace;
- rounded cards;
- clear hierarchy;
- comfortable mobile spacing;
- subtle pickleball visual identity.

Brand identity can remain minimal until product validation.

---

## 29. Content Tone

User-facing language:

- Traditional Chinese
- Taiwan vocabulary
- plain language
- beginner-friendly
- non-judgmental
- concise

Prefer:

> 你目前不需要另外買球鞋。

Avoid:

> 專業玩家都知道這雙鞋是必備。

Prefer:

> 如果只是第一次體驗，可以先借拍或確認場館是否提供器材。

Avoid:

> 一定要先買這支球拍才適合新手。

---

## 30. Coding Guidelines

Coding agent must:

1. Read this file before modifying product behavior.
2. Preserve MVP scope.
3. Avoid introducing backend services.
4. Avoid adding dependencies unless necessary.
5. Prefer TypeScript types over `any`.
6. Keep recommendation rules separate from UI.
7. Keep product data separate from recommendation logic.
8. Add tests when changing recommendation behavior.
9. Explain any deviation from this specification.
10. Never silently change product rules to simplify implementation.

---

## 31. Definition of Done — MVP

The MVP is considered ready for public launch when:

### Functional

- [ ] Homepage works
- [ ] Builder contains all 6 questions
- [ ] Back/next flow works
- [ ] Recommendation engine produces deterministic output
- [ ] Budget insufficient case works
- [ ] Existing equipment is respected
- [ ] Result page contains all four recommendation sections
- [ ] Affiliate links work
- [ ] Restart works

### Content

- [ ] 3 guide pages completed
- [ ] About completed
- [ ] How We Recommend completed
- [ ] Affiliate Disclosure completed
- [ ] Privacy page completed

### Data

- [ ] ~15 products loaded
- [ ] Every product has valid source
- [ ] Every product has evidence level
- [ ] Every product has last verified date
- [ ] Affiliate links marked appropriately

### Quality

- [ ] Mobile layout checked
- [ ] Desktop layout checked
- [ ] Basic accessibility checked
- [ ] No console errors
- [ ] Core recommendation tests pass
- [ ] No backend required
- [ ] Static production build succeeds

### Analytics

- [ ] Builder start tracked
- [ ] Builder completion tracked
- [ ] Affiliate click tracked

### Deployment

- [ ] Public domain / URL available
- [ ] Sitemap works
- [ ] robots.txt works
- [ ] Metadata configured
- [ ] Production deployment succeeds

---

## 32. Post-MVP Ideas — Do Not Build Yet

Potential future experiments:

- Saved / shareable result URL
- Printable starter kit
- Comparison between two kits
- More detailed paddle selector
- Beginner bundles by family size
- Location-specific product availability
- Brand-direct affiliate partnerships
- Court / class referral partnerships
- More SEO guides
- English-language version
- Anonymous “Was this recommendation useful?” feedback

These are backlog items only.

---

## 33. Product Decision Rule

When deciding whether to add a feature, ask:

> Does this feature materially improve a beginner’s ability to decide what to buy, what not to buy, or how much to spend?

If not, it probably does not belong in the MVP.

Secondary rule:

> Does this feature increase recurring maintenance?

If yes, require strong evidence before adding it.

---

## 34. Source of Truth

This `PRODUCT_SPEC.md` is the source of truth for MVP behavior.

Priority order:

1. `PRODUCT_SPEC.md`
2. Automated recommendation tests
3. Product data
4. UI implementation

If implementation conflicts with the product specification, update the implementation or explicitly revise this specification.

Do not let accidental code behavior redefine product requirements.

---

## 35. Next Implementation Step

After this specification is approved:

1. Create repository skeleton.
2. Initialize Astro + TypeScript.
3. Create core types.
4. Implement Builder state model.
5. Implement pure recommendation functions.
6. Add recommendation tests.
7. Build Builder UI.
8. Build Result UI.
9. Add initial product catalog.
10. Add SEO/content pages.
11. Add analytics.
12. Deploy.

The first coding milestone should be:

> **A local Builder that accepts the six answers and prints a correct structured recommendation result using mock product data.**

Do not start with visual polish.
