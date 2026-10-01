import type { Product } from "../types";

/**
 * PickleStart Taiwan product catalog.
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


  {
    id: "joola-journey-sante-fe-10",
    name: "JOOLA Journey Sante Fe 10mm 匹克球球拍",
    brand: "JOOLA",
    category: "paddle",
    recommendationTier: 1,
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    paddleProfile: "forgiving",
    merchant: "JOOLA Taiwan",
    priceMin: 2199,
    priceMax: 2199,
    experience: ["first_time", "few_times"],
    goals: ["casual", "regular"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://joola.tw/product/joola-journey-sante-fe-10mm-%E5%8C%B9%E5%85%8B%E7%90%83%E7%90%83%E6%8B%8D/",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "JOOLA 台灣官方入門款；10mm 蜂窩核心、玻璃纖維拍面，適合第一次購拍或休閒使用。",
    tags: ["entry", "forgiving", "fiberglass", "taiwan"]
  },
  {
    id: "kuikma-react-paddle",
    name: "KUIKMA React 16mm 碳纖維匹克球拍",
    brand: "KUIKMA",
    category: "paddle",
    recommendationTier: 2,
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    paddleProfile: "forgiving",
    merchant: "Decathlon Taiwan",
    priceMin: 1249,
    priceMax: 1249,
    experience: ["few_times", "weekly"],
    goals: ["regular", "improve"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.decathlon.tw/en-TW/p/pickeball-racket-react-purple-kuikma-8941058.html",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "16mm 碳纖維拍面、寬厚拍頭與 235g 配置，適合已開始固定打球、想要高容錯與好操作感的人。",
    tags: ["carbon", "16mm", "forgiving", "value", "taiwan"]
  },
  {
    id: "vatic-pro-prism-flash-16",
    name: "Vatic Pro PRISM Flash 16mm",
    brand: "Vatic Pro",
    category: "paddle",
    recommendationTier: 3,
    purchaseRegion: "international",
    purchaseEase: 1,
    paddleProfile: "control",
    merchant: "Vatic Pro",
    priceMin: 3200,
    priceMax: 3600,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://vaticpro.com/products/prism",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "T700 raw carbon、foam edge wall 與 16mm 選項，偏控制與 reset 手感；台幣價格為官方美元售價約略換算，不含國際運費與稅費。",
    tags: ["carbon", "16mm", "control", "international"]
  },
  {
    id: "selkirk-slk-dauntless-widebody-16",
    name: "Selkirk SLK Dauntless Widebody 16mm",
    brand: "Selkirk",
    category: "paddle",
    recommendationTier: 3,
    purchaseRegion: "asia",
    purchaseEase: 2,
    paddleProfile: "control",
    merchant: "Selkirk Asia",
    priceMin: 4780,
    priceMax: 4780,
    experience: ["few_times", "weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://asia.selkirk.com/products/slk-dauntless-asia?country=TW&currency=TWD",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "16mm PureFoam、T700 raw carbon 與 widebody 大甜區，定位為 all-court 且偏控制，適合想從入門往固定訓練升級的人。",
    tags: ["carbon", "16mm", "control", "widebody", "asia"]
  },
  {
    id: "joola-ben-johns-hyperion-cfs-16",
    name: "JOOLA Ben Johns Hyperion CFS 16",
    brand: "JOOLA",
    category: "paddle",
    recommendationTier: 4,
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    paddleProfile: "all_court",
    merchant: "JOOLA Taiwan",
    priceMin: 6699,
    priceMax: 6699,
    experience: ["weekly", "serious"],
    goals: ["improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://joola.tw/product-category/pickleball-all/pickleball-paddles/pickleball-paddles-singles/",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "CFS 16、Reactive 蜂巢核心與 HyperFoam 邊框，屬高階全能型選項，適合已固定訓練或競賽導向的使用者。",
    tags: ["premium", "16mm", "all-court", "taiwan"]
  },
  {
    id: "six-zero-double-black-diamond-control-16",
    name: "Six Zero Double Black Diamond Control 16mm",
    brand: "Six Zero",
    category: "paddle",
    recommendationTier: 4,
    purchaseRegion: "international",
    purchaseEase: 1,
    paddleProfile: "control",
    merchant: "Six Zero",
    priceMin: 5750,
    priceMax: 6200,
    experience: ["weekly", "serious"],
    goals: ["improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://us.sixzeropickleball.com/products/double-black-diamond",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "16mm raw carbon 控制型球拍，強調 precision、control 與 power 的平衡；台幣價格為官方美元售價約略換算，不含國際運費與稅費。",
    tags: ["premium", "16mm", "control", "international"]
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


  {
    id: "infin-outdoor-ball-5",
    name: "INFIN 室外匹克球 5入",
    brand: "INFIN",
    category: "ball",
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    merchant: "INFIN Taiwan",
    priceMin: 280,
    priceMax: 350,
    experience: ["first_time", "few_times", "weekly", "serious"],
    goals: ["casual", "regular", "improve", "competitive"],
    venue: ["outdoor"],
    packSize: 5,
    sourceUrl:
      "https://www.headsports.com.tw/categories/infin-pickleball",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "台灣通路可直接購買的 5 入室外球，適合需要比 3 入裝稍多備用球的使用情境。",
    tags: ["outdoor", "5-pack", "taiwan"]
  },
  {
    id: "infin-indoor-ball-5",
    name: "INFIN 室內匹克球 5入",
    brand: "INFIN",
    category: "ball",
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    merchant: "INFIN Taiwan",
    priceMin: 280,
    priceMax: 350,
    experience: ["first_time", "few_times", "weekly", "serious"],
    goals: ["casual", "regular", "improve", "competitive"],
    venue: ["indoor"],
    packSize: 5,
    sourceUrl:
      "https://www.headsports.com.tw/categories/infin-pickleball",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "台灣通路可直接購買的 5 入室內球，適合固定在室內球館打球、希望多準備幾顆球的使用者。",
    tags: ["indoor", "5-pack", "taiwan"]
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


  {
    id: "head-motion-pro-pickleball",
    name: "HEAD Motion Pro Pickleball",
    brand: "HEAD",
    category: "shoes",
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    merchant: "INFIN Taiwan",
    priceMin: 3744,
    priceMax: 4680,
    experience: ["weekly", "serious"],
    goals: ["regular", "improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://www.headsports.com.tw/categories/head-pickleball",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "HEAD 台灣正式販售的匹克球鞋款，適合已固定打球、想升級到匹克球專用鞋的使用者。",
    tags: ["pickleball-shoes", "premium", "taiwan"]
  },
  {
    id: "skechers-viper-court-pro-2",
    name: "SKECHERS Viper Court Pro 2.0",
    brand: "SKECHERS",
    category: "shoes",
    purchaseRegion: "taiwan",
    purchaseEase: 3,
    merchant: "SKECHERS Taiwan",
    priceMin: 4790,
    priceMax: 4890,
    experience: ["weekly", "serious"],
    goals: ["improve", "competitive"],
    venue: ["both"],
    packSize: 1,
    sourceUrl:
      "https://shop.skechers-twn.com/SalePage/Index/12087417",
    evidenceLevel: "manufacturer_specs",
    lastVerified: "2026-10-01",
    active: true,
    shortReason:
      "SKECHERS 台灣正式販售的匹克球鞋，定位較高階，適合打球頻率高且希望使用專項鞋款的人。",
    tags: ["pickleball-shoes", "premium", "taiwan"]
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
