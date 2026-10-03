export type Experience =
  | "first_time"
  | "few_times"
  | "weekly"
  | "serious";

export type Venue =
  | "indoor"
  | "outdoor_court"
  | "self_setup"
  | "unknown";

export type Goal =
  | "casual"
  | "regular"
  | "improve"
  | "competitive";

export type BudgetTier =
  | 1500
  | 3000
  | 5000
  | 8000
  | 12000;

export type RecommendationTier =
  | 1
  | 2
  | 3
  | 4;

export type PurchaseRegion =
  | "taiwan"
  | "asia"
  | "international";

export type PurchaseEase =
  | 1
  | 2
  | 3;

export type PaddleProfile =
  | "budget"
  | "forgiving"
  | "control"
  | "all_court"
  | "power";

export interface ExistingEquipment {
  paddles: number;
  balls: boolean;
  badmintonShoes: boolean;
  tennisShoes: boolean;
  courtShoes: boolean;
  netAvailable: boolean;
}

export interface BuilderInput {
  experience: Experience;
  requestedPaddles: number;
  venue: Venue;
  existingEquipment: ExistingEquipment;
  budget: BudgetTier;
  goal: Goal;
}

export type ProductCategory =
  | "paddle"
  | "ball"
  | "shoes"
  | "net";

export type EvidenceLevel =
  | "manufacturer_specs"
  | "editorial_research"
  | "hands_on";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;

  /**
   * Optional recommendation maturity tier.
   * Mainly used for paddles:
   * 1 = first-time / budget entry
   * 2 = beginner long-term / regular recreation
   * 3 = intermediate / improvement
   * 4 = serious / competitive
   */
  recommendationTier?: RecommendationTier;

  /**
   * Purchase convenience metadata.
   * Used only as tie-breakers after suitability score.
   * 3 = Taiwan direct purchase
   * 2 = Asia-region storefront
   * 1 = International purchase
   */
  purchaseRegion?: PurchaseRegion;
  purchaseEase?: PurchaseEase;

  /**
   * High-level paddle character used only to diversify equally suitable
   * recommendations. It does not override budget / tier / experience fit.
   */
  paddleProfile?: PaddleProfile;

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

export type RecommendationBucket =
  | "buy_now"
  | "already_have"
  | "optional_later"
  | "skip_for_now";

export interface RecommendationItem {
  category:
    | ProductCategory
    | "accessory";

  label: string;

  quantity?: number;

  estimatedMin?: number;
  estimatedMax?: number;

  reason: string;
}

export interface ProductRecommendation {
  product: Product;
  score: number;
  reasons: string[];
}

export interface SpendBreakdownItem {
  category: ProductCategory;
  productId: string;
  productName: string;

  /** Number of usable units the Starter Kit needs. */
  unitsNeeded: number;

  /** Number of sellable packs / items that must actually be purchased. */
  packsNeeded: number;
  packSize: number;

  /** Price of one sellable pack / item. */
  packPriceMin: number;
  packPriceMax: number;

  /** Total cost for this line after applying required quantity. */
  lineMin: number;
  lineMax: number;
}

export type WarningCode =
  | "BUDGET_INSUFFICIENT"
  | "UNKNOWN_VENUE";

export interface RecommendationWarning {
  code: WarningCode;
  message: string;
  suggestions: string[];
}

export interface StarterKitResult {
  estimatedMinSpend: number;
  estimatedMaxSpend: number;

  buyNow: RecommendationItem[];
  alreadyHave: RecommendationItem[];
  optionalLater: RecommendationItem[];
  skipForNow: RecommendationItem[];

  productRecommendations:
    ProductRecommendation[];

  spendBreakdown: SpendBreakdownItem[];

  warnings: RecommendationWarning[];

  notes: string[];
}
