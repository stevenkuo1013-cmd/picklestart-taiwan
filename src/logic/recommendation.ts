import { products } from "../data/products";
import {
  estimateRequiredNonPaddleCost,
  hasSuitableCourtShoes,
  paddlesToBuy,
  requiresPortableNet
} from "./budget";
import { scoreProduct } from "./scoring";
import type {
  BuilderInput,
  Product,
  ProductCategory,
  ProductRecommendation,
  RecommendationItem,
  SpendBreakdownItem,
  StarterKitResult
} from "../types";

function productVenueMatches(
  input: BuilderInput,
  product: Product
): boolean {
  if (input.venue === "unknown") return true;
  if (product.venue.includes("both")) return true;
  if (input.venue === "indoor") return product.venue.includes("indoor");
  return product.venue.includes("outdoor");
}

function unitPrice(
  product: Product
): number {
  return (
    product.priceMin /
    Math.max(1, product.packSize)
  );
}

function inferredPurchaseEase(
  product: Product
): number {
  if (
    product.purchaseEase !==
    undefined
  ) {
    return product.purchaseEase;
  }

  if (
    product.purchaseRegion ===
      "taiwan" ||
    product.merchant
      .toLowerCase()
      .includes("taiwan") ||
    product.sourceUrl.includes(".tw")
  ) {
    return 3;
  }

  if (
    product.purchaseRegion === "asia" ||
    product.sourceUrl.includes(
      "asia.selkirk.com"
    )
  ) {
    return 2;
  }

  return 1;
}

function inferredProfile(
  product: Product
): string {
  if (product.paddleProfile) {
    return product.paddleProfile;
  }

  const tags = product.tags ?? [];

  if (tags.includes("control")) {
    return "control";
  }

  if (
    tags.includes("all-court") ||
    tags.includes("all_court")
  ) {
    return "all_court";
  }

  if (tags.includes("power")) {
    return "power";
  }

  if (
    tags.includes("budget") ||
    tags.includes("entry")
  ) {
    return "forgiving";
  }

  return "general";
}

function selectDiverseRecommendations(
  ranked:
    ProductRecommendation[],
  limit: number
): ProductRecommendation[] {
  const remaining = [...ranked];
  const selected:
    ProductRecommendation[] = [];

  while (
    selected.length < limit &&
    remaining.length > 0
  ) {
    const bestScore =
      remaining[0]?.score;

    if (bestScore === undefined) {
      break;
    }

    const sameScore =
      remaining.filter(
        (item) =>
          item.score === bestScore
      );

    const usedBrands =
      new Set(
        selected.map(
          (item) =>
            item.product.brand
        )
      );

    const usedProfiles =
      new Set(
        selected
          .filter(
            (item) =>
              item.product.category ===
              "paddle"
          )
          .map(
            (item) =>
              inferredProfile(
                item.product
              )
          )
      );

    sameScore.sort((a, b) => {
      const aBrandNovel =
        usedBrands.has(
          a.product.brand
        )
          ? 0
          : 1;

      const bBrandNovel =
        usedBrands.has(
          b.product.brand
        )
          ? 0
          : 1;

      if (
        bBrandNovel !==
        aBrandNovel
      ) {
        return (
          bBrandNovel -
          aBrandNovel
        );
      }

      if (
        a.product.category ===
          "paddle" &&
        b.product.category ===
          "paddle"
      ) {
        const aProfileNovel =
          usedProfiles.has(
            inferredProfile(
              a.product
            )
          )
            ? 0
            : 1;

        const bProfileNovel =
          usedProfiles.has(
            inferredProfile(
              b.product
            )
          )
            ? 0
            : 1;

        if (
          bProfileNovel !==
          aProfileNovel
        ) {
          return (
            bProfileNovel -
            aProfileNovel
          );
        }
      }

      const easeDifference =
        inferredPurchaseEase(
          b.product
        ) -
        inferredPurchaseEase(
          a.product
        );

      if (easeDifference !== 0) {
        return easeDifference;
      }

      const priceDifference =
        unitPrice(a.product) -
        unitPrice(b.product);

      if (priceDifference !== 0) {
        return priceDifference;
      }

      return a.product.name.localeCompare(
        b.product.name
      );
    });

    const chosen =
      sameScore[0];

    if (!chosen) {
      break;
    }

    selected.push(chosen);

    const chosenIndex =
      remaining.findIndex(
        (item) =>
          item.product.id ===
          chosen.product.id
      );

    if (chosenIndex >= 0) {
      remaining.splice(
        chosenIndex,
        1
      );
    }
  }

  return selected;
}

function topRecommendations(
  input: BuilderInput,
  category: Product["category"],
  practicalBudgetPerUnit?: number,
  limit = 3
): ProductRecommendation[] {
  if (
    category === "ball" &&
    input.venue === "unknown"
  ) {
    return [];
  }

  const ranked = products
    .filter(
      (product) =>
        product.category === category &&
        product.active
    )
    .map((product) =>
      scoreProduct(
        input,
        product,
        practicalBudgetPerUnit
      )
    )
    .filter(
      (result) =>
        result.score > 0
    )
    .sort((a, b) => {
      if (
        b.score !== a.score
      ) {
        return (
          b.score - a.score
        );
      }

      const easeDifference =
        inferredPurchaseEase(
          b.product
        ) -
        inferredPurchaseEase(
          a.product
        );

      if (easeDifference !== 0) {
        return easeDifference;
      }

      return (
        unitPrice(a.product) -
        unitPrice(b.product)
      );
    });

  if (
    category === "paddle" &&
    limit >= 3 &&
    ranked[0]?.product
      .recommendationTier === 2
  ) {
    const topScore =
      ranked[0]?.score;

    if (topScore !== undefined) {
      const directFits =
        ranked.filter(
          (item) =>
            item.score === topScore
        );

      const adjacentUpgrade =
        ranked.find(
          (item) =>
            item.score < topScore &&
            topScore - item.score <= 3 &&
            item.product
              .recommendationTier === 3
        );

      if (
        directFits.length >= 2 &&
        adjacentUpgrade
      ) {
        return [
          ...selectDiverseRecommendations(
            directFits,
            2
          ),
          adjacentUpgrade
        ];
      }
    }
  }

  return selectDiverseRecommendations(
    ranked,
    limit
  );
}

function cheapestActiveProduct(
  input: BuilderInput,
  category: ProductCategory
): Product | null {
  const candidates = products
    .filter(
      (product) =>
        product.active &&
        product.category === category &&
        productVenueMatches(input, product)
    )
    .sort(
      (a, b) =>
        a.priceMin / Math.max(1, a.packSize) -
        b.priceMin / Math.max(1, b.packSize)
    );

  return candidates[0] ?? null;
}

function cheapestActivePaddleRange():
  | { minPerPaddle: number; maxPerPaddle: number }
  | null {
  const paddles = products.filter(
    (product) => product.active && product.category === "paddle"
  );

  if (paddles.length === 0) return null;

  const cheapest = [...paddles].sort(
    (a, b) =>
      a.priceMin / Math.max(1, a.packSize) -
      b.priceMin / Math.max(1, b.packSize)
  )[0];

  if (!cheapest) return null;

  return {
    minPerPaddle: cheapest.priceMin / Math.max(1, cheapest.packSize),
    maxPerPaddle: cheapest.priceMax / Math.max(1, cheapest.packSize)
  };
}

function primaryRecommendedProduct(
  recommendations: ProductRecommendation[],
  category: ProductCategory
): Product | null {
  return (
    recommendations.find((item) => item.product.category === category)
      ?.product ?? null
  );
}

function addProductCost(
  total: { min: number; max: number },
  breakdown: SpendBreakdownItem[],
  product: Product,
  unitsNeeded = 1
) {
  const safePackSize = Math.max(1, product.packSize);
  const packsNeeded = Math.ceil(
    unitsNeeded / safePackSize
  );

  const lineMin = product.priceMin * packsNeeded;
  const lineMax = product.priceMax * packsNeeded;

  total.min += lineMin;
  total.max += lineMax;

  breakdown.push({
    category: product.category,
    productId: product.id,
    productName: product.name,
    unitsNeeded,
    packsNeeded,
    packSize: safePackSize,
    packPriceMin: product.priceMin,
    packPriceMax: product.priceMax,
    lineMin,
    lineMax
  });
}

function estimateRecommendedSpend(
  input: BuilderInput,
  recommendations: ProductRecommendation[],
  remainingPaddles: number
): { min: number; max: number; items: SpendBreakdownItem[] } {
  const total = { min: 0, max: 0 };
  const items: SpendBreakdownItem[] = [];

  if (remainingPaddles > 0) {
    const paddle =
      primaryRecommendedProduct(recommendations, "paddle") ??
      cheapestActiveProduct(input, "paddle");

    if (paddle) addProductCost(total, items, paddle, remainingPaddles);
  }

  if (!input.existingEquipment.balls) {
    const ball =
      primaryRecommendedProduct(recommendations, "ball") ??
      cheapestActiveProduct(input, "ball");

    if (ball) addProductCost(total, items, ball, 3);
  }

  const shoesRequired =
    !hasSuitableCourtShoes(input) &&
    (
      input.experience === "weekly" ||
      input.experience === "serious" ||
      input.goal === "improve" ||
      input.goal === "competitive"
    );

  if (shoesRequired) {
    const shoes =
      primaryRecommendedProduct(recommendations, "shoes") ??
      cheapestActiveProduct(input, "shoes");

    if (shoes) addProductCost(total, items, shoes);
  }

  if (requiresPortableNet(input)) {
    const net =
      primaryRecommendedProduct(recommendations, "net") ??
      cheapestActiveProduct(input, "net");

    if (net) addProductCost(total, items, net);
  }

  return { ...total, items };
}

export function buildStarterKit(
  input: BuilderInput
): StarterKitResult {
  const buyNow: RecommendationItem[] = [];
  const alreadyHave: RecommendationItem[] = [];
  const optionalLater: RecommendationItem[] = [];
  const skipForNow: RecommendationItem[] = [];
  const warnings: StarterKitResult["warnings"] = [];
  const notes: string[] = [];
  const productRecommendations: ProductRecommendation[] = [];
  let spendBreakdown: SpendBreakdownItem[] = [];

  const remainingPaddles = paddlesToBuy(input);
  const nonPaddleCost = estimateRequiredNonPaddleCost(input);

  if (remainingPaddles === 0) {
    alreadyHave.push({
      category: "paddle",
      label: "球拍",
      reason: "你現有的球拍數量已符合這次需求。"
    });
  } else {
    buyNow.push({
      category: "paddle",
      label: "球拍",
      quantity: remainingPaddles,
      reason: `還需要 ${remainingPaddles} 支球拍。`
    });
  }

  if (input.existingEquipment.balls) {
    alreadyHave.push({
      category: "ball",
      label: "匹克球",
      reason: "你已經有球，第一階段不需要重複購買。"
    });
  } else {
    const ballLabel =
      input.venue === "indoor"
        ? "室內匹克球"
        : input.venue === "unknown"
          ? "小包裝匹克球"
          : "戶外匹克球";

    buyNow.push({
      category: "ball",
      label: ballLabel,
      quantity: 3,
      reason:
        input.venue === "unknown"
          ? "場地尚未確定，先買少量即可。"
          : "目前沒有球，先準備小包裝即可。"
    });

    if (input.venue === "unknown") {
      warnings.push({
        code: "UNKNOWN_VENUE",
        message: "室內球與戶外球的設計不同。",
        suggestions: [
          "先確認主要場地，再選擇對應的球。",
          "第一階段只準備少量即可。"
        ]
      });
    }
  }

  if (hasSuitableCourtShoes(input)) {
    alreadyHave.push({
      category: "shoes",
      label: "場地鞋",
      reason:
        "你已有羽球鞋、網球鞋或 Court Shoes，第一階段不用另外買匹克球專用鞋。"
    });
  } else if (
    input.experience === "weekly" ||
    input.experience === "serious" ||
    input.goal === "improve" ||
    input.goal === "competitive"
  ) {
    buyNow.push({
      category: "shoes",
      label: "場地鞋",
      reason:
        "固定打球或希望認真進步時，可優先考慮有良好側向支撐的場地鞋。"
    });
  } else {
    optionalLater.push({
      category: "shoes",
      label: "場地鞋",
      reason:
        "第一次體驗不必急著買；先確認場館規定與現有鞋款，固定打球後再升級。"
    });
  }

  if (requiresPortableNet(input)) {
    buyNow.push({
      category: "net",
      label: "攜帶式球網",
      quantity: 1,
      reason: "你選擇自備場地，而且目前沒有可用球網。"
    });
  } else {
    skipForNow.push({
      category: "net",
      label: "攜帶式球網",
      reason: "目前場景不需要另外購買球網。"
    });
  }

  if (input.experience === "first_time" && input.goal === "casual") {
    skipForNow.push(
      {
        category: "accessory",
        label: "高階球拍",
        reason: "第一次體驗不需要從高階球拍開始。"
      },
      {
        category: "accessory",
        label: "球拍袋",
        reason: "目前不是必要裝備。"
      }
    );
  }

  const practicalPaddleBudget =
    remainingPaddles > 0
      ? Math.max(
          0,
          (input.budget - nonPaddleCost.min) / remainingPaddles
        )
      : undefined;

  const cheapestPaddle = cheapestActivePaddleRange();

  const minimumPaddleEstimate =
    remainingPaddles > 0
      ? remainingPaddles * (cheapestPaddle?.minPerPaddle ?? 0)
      : 0;

  const minimumFeasibleSpend =
    nonPaddleCost.min + minimumPaddleEstimate;

  const budgetInsufficient =
    minimumFeasibleSpend > input.budget;

  const insufficientMaxSpend =
    nonPaddleCost.max +
    remainingPaddles * (cheapestPaddle?.maxPerPaddle ?? 0);

  if (budgetInsufficient) {
    warnings.push({
      code: "BUDGET_INSUFFICIENT",
      message: "目前預算較難一次買齊這個情境下的最低可行裝備。",
      suggestions: [
        requiresPortableNet(input)
          ? "優先改到已有球網的公共場地。"
          : "先借用部分裝備。",
        remainingPaddles > 1
          ? "先減少這次需要自行準備的球拍數量。"
          : "先借拍體驗，再決定是否購買。"
      ]
    });
  }

  if (!budgetInsufficient) {
    if (remainingPaddles > 0) {
      productRecommendations.push(
        ...topRecommendations(
          input,
          "paddle",
          practicalPaddleBudget,
          3
        )
      );
    }

    if (!input.existingEquipment.balls) {
      productRecommendations.push(
        ...topRecommendations(input, "ball", undefined, 1)
      );
    }

    if (
      !hasSuitableCourtShoes(input) &&
      (
        input.experience === "weekly" ||
        input.experience === "serious" ||
        input.goal === "improve" ||
        input.goal === "competitive"
      )
    ) {
      productRecommendations.push(
        ...topRecommendations(input, "shoes", undefined, 2)
      );
    }

    if (requiresPortableNet(input)) {
      productRecommendations.push(
        ...topRecommendations(input, "net", undefined, 1)
      );
    }
  } else {
    notes.push(
      "目前先解決預算與場地條件，因此不顯示商品導購。"
    );
  }

  let estimatedMinSpend = minimumFeasibleSpend;
  let estimatedMaxSpend = insufficientMaxSpend;

  if (!budgetInsufficient) {
    const recommendedSpend = estimateRecommendedSpend(
      input,
      productRecommendations,
      remainingPaddles
    );

    estimatedMinSpend = recommendedSpend.min;
    estimatedMaxSpend = recommendedSpend.max;
    spendBreakdown = recommendedSpend.items;
  }

  return {
    estimatedMinSpend: Math.round(estimatedMinSpend),
    estimatedMaxSpend: Math.round(estimatedMaxSpend),
    buyNow,
    alreadyHave,
    optionalLater,
    skipForNow,
    productRecommendations,
    spendBreakdown,
    warnings,
    notes
  };
}
