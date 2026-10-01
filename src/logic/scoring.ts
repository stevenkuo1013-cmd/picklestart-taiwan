import type {
  BuilderInput,
  Product,
  ProductRecommendation,
  RecommendationTier
} from "../types";

function venueFits(
  input: BuilderInput,
  product: Product
): boolean {
  if (input.venue === "unknown") {
    return true;
  }

  if (product.venue.includes("both")) {
    return true;
  }

  if (input.venue === "indoor") {
    return product.venue.includes("indoor");
  }

  if (
    input.venue === "outdoor_court" ||
    input.venue === "self_setup"
  ) {
    return product.venue.includes("outdoor");
  }

  return false;
}

function experienceTier(
  input: BuilderInput
): RecommendationTier {
  switch (input.experience) {
    case "first_time":
      return 1;
    case "few_times":
      return 2;
    case "weekly":
      return 3;
    case "serious":
      return 4;
  }
}

function goalTier(
  input: BuilderInput
): RecommendationTier {
  switch (input.goal) {
    case "casual":
      return 1;
    case "regular":
      return 2;
    case "improve":
      return 3;
    case "competitive":
      return 4;
  }
}

function targetPaddleTier(
  input: BuilderInput
): RecommendationTier {
  return Math.max(
    experienceTier(input),
    goalTier(input)
  ) as RecommendationTier;
}

function paddleTierScore(
  input: BuilderInput,
  product: Product
): {
  score: number;
  reason?: string;
} {
  if (
    product.category !== "paddle" ||
    product.recommendationTier === undefined
  ) {
    return {
      score: 0
    };
  }

  const target =
    targetPaddleTier(input);

  const difference =
    Math.abs(
      product.recommendationTier -
        target
    );

  if (difference === 0) {
    return {
      score: 5,
      reason:
        "裝備等級符合目前投入程度。"
    };
  }

  if (difference === 1) {
    return {
      score: 2,
      reason:
        "裝備等級與目前需求相近。"
    };
  }

  if (difference === 2) {
    return {
      score: -2,
      reason:
        "裝備等級與目前投入程度有些落差。"
    };
  }

  return {
    score: -5,
    reason:
      "裝備等級與目前投入程度差距較大。"
  };
}

export function scoreProduct(
  input: BuilderInput,
  product: Product,
  practicalBudgetPerUnit?: number
): ProductRecommendation {
  let score = 0;

  const reasons: string[] = [];

  if (!product.active) {
    return {
      product,
      score: -999,
      reasons: ["商品目前停用。"]
    };
  }

  // Known venue mismatch is a hard rejection.
  if (!venueFits(input, product)) {
    return {
      product,
      score: -999,
      reasons: ["不符合目前使用場地。"]
    };
  }

  if (product.category === "paddle") {
    const paddlesNeeded =
      Math.max(
        0,
        input.requestedPaddles -
          input.existingEquipment.paddles
      );

    // Avoid recommending a pack containing
    // more paddles than the user actually needs.
    if (
      product.packSize >
      paddlesNeeded
    ) {
      return {
        product,
        score: -999,
        reasons: [
          "套組球拍數量超過目前需求。"
        ]
      };
    }

    const effectivePricePerPaddle =
      product.priceMin /
      Math.max(
        1,
        product.packSize
      );

    // Total budget is a user constraint.
    // If the minimum price already exceeds
    // the practical per-paddle budget,
    // do not recommend it.
    if (
      practicalBudgetPerUnit !== undefined &&
      effectivePricePerPaddle >
        practicalBudgetPerUnit
    ) {
      return {
        product,
        score: -999,
        reasons: [
          "最低價格已超出目前可分配的單支球拍預算。"
        ]
      };
    }

    if (
      practicalBudgetPerUnit !== undefined
    ) {
      score += 4;

      reasons.push(
        "平均每支價格符合目前預算。"
      );
    } else {
      score += 2;
    }

    const tierResult =
      paddleTierScore(
        input,
        product
      );

    score += tierResult.score;

    if (tierResult.reason) {
      reasons.push(
        tierResult.reason
      );
    }
  } else if (
    practicalBudgetPerUnit !== undefined &&
    product.priceMin <=
      practicalBudgetPerUnit
  ) {
    score += 4;

    reasons.push(
      "價格符合目前預算。"
    );
  } else {
    score += 2;
  }

  if (
    product.experience.includes(
      input.experience
    )
  ) {
    score += 3;

    reasons.push(
      "符合目前經驗程度。"
    );
  }

  if (
    product.goals.includes(
      input.goal
    )
  ) {
    score += 3;

    reasons.push(
      "符合使用目標。"
    );
  }

  score += 2;

  reasons.push(
    "符合主要使用場地。"
  );

  if (product.category === "ball") {
    const firstTimeCasual =
      input.experience === "first_time" ||
      input.goal === "casual";

    const frequentPlayer =
      input.experience === "weekly" ||
      input.experience === "serious" ||
      input.goal === "improve" ||
      input.goal === "competitive";

    let packScore = 0;

    if (firstTimeCasual) {
      if (product.packSize <= 3) {
        packScore = 3;
      } else if (product.packSize <= 6) {
        packScore = 1;
      } else {
        packScore = -1;
      }
    } else if (frequentPlayer) {
      if (
        product.packSize >= 5 &&
        product.packSize <= 12
      ) {
        packScore = 3;
      } else if (product.packSize <= 4) {
        packScore = 2;
      } else {
        packScore = 1;
      }
    } else {
      if (
        product.packSize >= 5 &&
        product.packSize <= 6
      ) {
        packScore = 3;
      } else if (product.packSize <= 4) {
        packScore = 2;
      } else {
        packScore = 1;
      }
    }

    score += packScore;

    reasons.push(
      "球的包裝數量符合目前使用頻率。"
    );
  } else {
    score += 2;
  }

  return {
    product,
    score,
    reasons
  };
}
