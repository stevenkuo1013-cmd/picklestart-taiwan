import type { Product } from "../types";

/**
 * PickleStart Taiwan MVP catalog.
 *
 * Notes:
 * - Prices are approximate bands verified on 2026-09-28.
 * - `priceMin` usually reflects the currently displayed/member/sale price.
 * - `priceMax` reflects the regular/list price where available.
 * - `sourceUrl` is the public source used to verify the product.
 * - Affiliate URLs are intentionally not added yet.
 * - Recommendation ranking must not depend on affiliate commission.
 */
export const products: Product[] = [
  // ----------------------------
  // PADDLES
  // ----------------------------
  {
    id: "infin-colorful-paddle",
    name: "INFIN Colorful 玻璃纖維新手匹克球拍",
    brand: "INFIN",
    category: "paddle",
    recommendationTier: 1,
    merchant: "INFIN Taiwan",
    priceMin: 830,
    priceMax: 980,
    experience: ["first_time", "few_times"],
    goals: ["casual", "regular"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/categories/pickleball-rackets",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "低預算單拍入門選項，適合先體驗或偶爾休閒使用。",
    tags: ["entry", "fiberglass", "budget"]
  },
  {
    id: "infin-t700-paddle",
    name: "INFIN T700 16mm 碳纖維匹克球拍",
    brand: "INFIN",
    category: "paddle",
    recommendationTier: 2,
    merchant: "INFIN Taiwan",
    priceMin: 1680,
    priceMax: 1980,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/products/infin-pickleball-paddle",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "16mm 碳纖維拍面與蜂巢芯，適合已打過幾次、希望繼續使用一段時間的玩家。",
    tags: ["carbon", "16mm", "value"]
  },
  {
    id: "head-kickstarter-200216",
    name: "HEAD Kickstarter Pickleball 15mm",
    brand: "HEAD",
    category: "paddle",
    recommendationTier: 2,
    merchant: "INFIN Taiwan",
    priceMin: 1700,
    priceMax: 2000,
    experience: ["first_time", "few_times", "weekly"],
    goals: ["casual", "regular", "improve"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/zh-hant/products/head-kickstarter-pickleball-200216",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "15mm 平衡控攻與玻纖拍面，定位明確的新手至進階入門款。",
    tags: ["entry", "15mm", "fiberglass"]
  },
  {
    id: "adidas-match-light-2026",
    name: "adidas Match Light 2026 Pickleball Paddle",
    brand: "adidas",
    category: "paddle",
    recommendationTier: 2,
    merchant: "INFIN Taiwan",
    priceMin: 2550,
    priceMax: 3000,
    experience: ["few_times", "weekly"],
    goals: ["regular", "improve"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/categories/beginner",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "介於入門與固定使用之間的中價位選項。",
    tags: ["entry-plus", "mid-budget"]
  },
  {
    id: "head-gravity-xceed-2026",
    name: "HEAD Gravity XCEED 2026",
    brand: "HEAD",
    category: "paddle",
    recommendationTier: 3,
    merchant: "INFIN Taiwan",
    priceMin: 3060,
    priceMax: 3600,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/categories/intermediate",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "進階分類中的中價位選項，適合固定打球或希望逐步進步的玩家。",
    tags: ["intermediate", "mid-range"]
  },
  {
    id: "franklin-signature-pro-13",
    name: "Franklin Signature Pro 13mm",
    brand: "Franklin",
    category: "paddle",
    recommendationTier: 3,
    merchant: "Franklin Sports Taiwan",
    priceMin: 3280,
    priceMax: 3480,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.franklinsports.com.tw/products/franklinsignature-pro%E5%B0%88%E6%A5%AD%E7%8E%BB%E7%92%83%E7%BA%96%E7%B6%AD%E5%8C%B9%E5%85%8B%E7%90%83%E6%8B%8D13mm-%E9%BB%91%E9%87%91",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "13mm 較偏快速回彈與攻防轉換，適合已有基本經驗的玩家。",
    tags: ["13mm", "intermediate", "speed"]
  },
  {
    id: "franklin-signature-pro-16",
    name: "Franklin Signature Pro 16mm",
    brand: "Franklin",
    category: "paddle",
    recommendationTier: 3,
    merchant: "Franklin Sports Taiwan",
    priceMin: 3280,
    priceMax: 3480,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.franklinsports.com.tw/products/franklinsignature-pro%E5%B0%88%E6%A5%AD%E7%8E%BB%E7%92%83%E7%A2%B3%E7%BA%96%E7%B6%AD%E5%8C%B9%E5%85%8B%E7%90%83%E6%8B%8D16mm-%E6%B7%A1%E7%B4%AB",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "16mm 較偏穩定控制與容錯，適合希望長期練習的玩家。",
    tags: ["16mm", "intermediate", "control"]
  },
  {
    id: "head-radical-team-15-2026",
    name: "HEAD Radical TEAM 15 2026",
    brand: "HEAD",
    category: "paddle",
    recommendationTier: 4,
    merchant: "INFIN Taiwan",
    priceMin: 3825,
    priceMax: 4500,
    experience: ["weekly", "serious"],
    goals: ["improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/products/head-radical-team-15-2026-pickleball-200125",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "原生碳纖維、較大甜蜜點與全能設定，定位在固定打球到進階玩家。",
    tags: ["carbon", "15mm", "intermediate"]
  },

  // ----------------------------
  // BALLS
  // ----------------------------
  {
    id: "head-championship-outdoor-3",
    name: "HEAD Championship 40孔 室外匹克球 3入",
    brand: "HEAD",
    category: "ball",
    merchant: "INFIN Taiwan",
    priceMin: 255,
    priceMax: 300,
    experience: ["first_time", "few_times", "weekly", "serious"],
    goals: ["casual", "regular", "improve", "competitive"],
    venue: ["outdoor"],
    packSize: 3,
    sourceUrl:
      "https://www.headsports.com.tw/en/categories/head-pickleball",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "小包裝戶外球，適合第一次開始時控制採購數量。",
    tags: ["outdoor", "3-pack"]
  },
  {
    id: "head-championship-indoor-3",
    name: "HEAD Championship 26孔 室內匹克球 3入",
    brand: "HEAD",
    category: "ball",
    merchant: "INFIN Taiwan",
    priceMin: 255,
    priceMax: 300,
    experience: ["first_time", "few_times", "weekly", "serious"],
    goals: ["casual", "regular", "improve", "competitive"],
    venue: ["indoor"],
    packSize: 3,
    sourceUrl:
      "https://www.headsports.com.tw/en/categories/head-pickleball",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "小包裝室內球，適合先確認常用場地後再大量補充。",
    tags: ["indoor", "3-pack"]
  },
  {
    id: "franklin-x40-outdoor-3",
    name: "Franklin X-40 戶外匹克球 3入",
    brand: "Franklin",
    category: "ball",
    merchant: "Franklin Sports Taiwan",
    priceMin: 390,
    priceMax: 450,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["outdoor"],
    packSize: 3,
    sourceUrl:
      "https://www.franklinsports.com.tw/products/franklinx-40-%E5%AE%A4%E5%A4%96%E5%8C%B9%E5%85%8B%E7%90%83_%E7%B4%AB%E8%89%B2-3%E5%85%A5%E7%AE%A1%E8%A3%9D",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "戶外用 40 孔三入裝，適合固定在戶外打球的玩家。",
    tags: ["outdoor", "3-pack", "competition"]
  },

  // ----------------------------
  // SHOES
  // ----------------------------
  {
    id: "decathlon-essential-multicourt",
    name: "DECATHLON Essential 男款多種場地網球鞋",
    brand: "DECATHLON",
    category: "shoes",
    merchant: "Decathlon Taiwan",
    priceMin: 799,
    priceMax: 799,
    experience: ["weekly", "serious"],
    goals: ["regular", "improve"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.decathlon.tw/c/%E7%90%83%E6%8B%8D%E9%81%8B%E5%8B%95/%E7%B6%B2%E7%90%83/%E7%B6%B2%E7%90%83%E9%9E%8B/%E7%94%B7%E6%AC%BE%E7%B6%B2%E7%90%83%E9%9E%8B.html",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "低價多場地網球鞋，可作為沒有場地鞋、但開始固定打球者的入門選項。",
    tags: ["court-shoes", "budget"]
  },
  {
    id: "artengo-ts500-multicourt",
    name: "ARTENGO TS500 多場地網球鞋",
    brand: "ARTENGO",
    category: "shoes",
    merchant: "Decathlon Taiwan",
    priceMin: 1349,
    priceMax: 1349,
    experience: ["weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.decathlon.tw/en-TW/p/multi-court-tennis-shoes-ts500-off-white-artengo-8882112.html",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "多場地設計、定位在較頻繁場上移動的使用情境。",
    tags: ["court-shoes", "mid-budget"]
  },
  {
    id: "kswiss-express-light-pickleball-2",
    name: "K-SWISS Express Light Pickleball 2",
    brand: "K-SWISS",
    category: "shoes",
    merchant: "INFIN Taiwan",
    priceMin: 3043,
    priceMax: 3580,
    experience: ["weekly", "serious"],
    goals: ["improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/en/categories/k-swiss",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "專門以匹克球命名的場地鞋，適合已固定投入的玩家。",
    tags: ["pickleball-shoes", "premium"]
  },

  // ----------------------------
  // NET
  // ----------------------------
  {
    id: "conti-portable-pickleball-net",
    name: "CONTI 便攜式匹克球網組",
    brand: "CONTI",
    category: "net",
    merchant: "CONTI Taiwan",
    priceMin: 5980,
    priceMax: 5980,
    experience: ["first_time", "few_times", "weekly", "serious"],
    goals: ["casual", "regular", "improve", "competitive"],
    venue: ["outdoor"],
    packSize: 1,
    sourceUrl:
      "https://www.conti.com.tw/product/",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-09-28",
    active: true,
    shortReason:
      "只有需要自行架設完整場地時才應納入預算。",
    tags: ["portable-net", "self-setup"]
  }
];
