import { describe, expect, it } from "vitest";
import { buildStarterKit } from "../src/logic/recommendation";
import { scoreProduct } from "../src/logic/scoring";
import { products } from "../src/data/products";
import type {
  BuilderInput,
  Product
} from "../src/types";

const baseInput: BuilderInput = {
  experience: "first_time",
  requestedPaddles: 2,
  venue: "outdoor_court",
  existingEquipment: {
    paddles: 0,
    balls: false,
    badmintonShoes: true,
    tennisShoes: false,
    courtShoes: false,
    netAvailable: true
  },
  budget: 3000,
  goal: "casual"
};

function syntheticProduct(
  overrides: Partial<Product>
): Product {
  return {
    id: "synthetic",
    name: "Synthetic Product",
    brand: "Test",
    category: "paddle",
    merchant: "Test",
    priceMin: 2000,
    priceMax: 2200,
    experience: [
      "first_time",
      "few_times",
      "weekly",
      "serious"
    ],
    goals: [
      "casual",
      "regular",
      "improve",
      "competitive"
    ],
    venue: ["both"],
    packSize: 1,
    sourceUrl: "https://example.com",
    evidenceLevel: "editorial_research",
    lastVerified: "2026-09-28",
    active: true,
    shortReason: "Test product.",
    ...overrides
  };
}

describe("buildStarterKit", () => {
  it("recommends two paddles and outdoor balls but not shoes or net for first-time outdoor players", () => {
    const result =
      buildStarterKit(baseInput);

    expect(
      result.buyNow.find(
        (item) =>
          item.category === "paddle"
      )?.quantity
    ).toBe(2);

    expect(
      result.buyNow.some(
        (item) =>
          item.category === "ball" &&
          item.label.includes("戶外")
      )
    ).toBe(true);

    expect(
      result.buyNow.some(
        (item) =>
          item.category === "shoes"
      )
    ).toBe(false);

    expect(
      result.buyNow.some(
        (item) =>
          item.category === "net"
      )
    ).toBe(false);
  });

  it("does not recommend paddles when the user already has enough", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        existingEquipment: {
          ...baseInput.existingEquipment,
          paddles: 2
        }
      });

    expect(
      result.buyNow.some(
        (item) =>
          item.category === "paddle"
      )
    ).toBe(false);
  });

  it("requires a portable net for self setup when none is available", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        venue: "self_setup",
        existingEquipment: {
          ...baseInput.existingEquipment,
          netAvailable: false
        },
        budget: 12000
      });

    expect(
      result.buyNow.some(
        (item) =>
          item.category === "net"
      )
    ).toBe(true);
  });

  it("returns a budget warning for four paddles plus a portable net on NT$1,500", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        requestedPaddles: 4,
        venue: "self_setup",
        existingEquipment: {
          ...baseInput.existingEquipment,
          badmintonShoes: false,
          netAvailable: false
        },
        budget: 1500
      });

    expect(
      result.warnings.some(
        (warning) =>
          warning.code ===
          "BUDGET_INSUFFICIENT"
      )
    ).toBe(true);
  });

  it("recommends shoes to a weekly player without suitable court shoes", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        experience: "weekly",
        goal: "regular",
        existingEquipment: {
          ...baseInput.existingEquipment,
          badmintonShoes: false,
          tennisShoes: false,
          courtShoes: false
        },
        budget: 5000
      });

    expect(
      result.buyNow.some(
        (item) =>
          item.category === "shoes"
      )
    ).toBe(true);
  });

  it("keeps shoes optional for a first-time casual player", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        existingEquipment: {
          ...baseInput.existingEquipment,
          badmintonShoes: false
        }
      });

    expect(
      result.optionalLater.some(
        (item) =>
          item.category === "shoes"
      )
    ).toBe(true);
  });

  it("warns when venue is unknown", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        venue: "unknown"
      });

    expect(
      result.warnings.some(
        (warning) =>
          warning.code ===
          "UNKNOWN_VENUE"
      )
    ).toBe(true);
  });

  it("allows higher-tier paddle products to rank for serious users", () => {
    const result =
      buildStarterKit({
        ...baseInput,
        experience: "serious",
        goal: "competitive",
        requestedPaddles: 1,
        budget: 8000
      });

    const seriousOptions =
      result.productRecommendations
        .filter(
          (item) =>
            item.product.category ===
              "paddle" &&
            item.product.priceMin >= 3000
        );

    expect(
      seriousOptions.length
    ).toBeGreaterThan(0);
  });

  it("does not recommend a two-paddle pack when only one paddle is needed", () => {
    const twoPack =
      syntheticProduct({
        id: "synthetic-two-pack",
        packSize: 2,
        priceMin: 2000,
        priceMax: 2200
      });

    const result =
      scoreProduct(
        {
          ...baseInput,
          requestedPaddles: 1
        },
        twoPack,
        3000
      );

    expect(result.score).toBe(-999);
  });

  it("evaluates a two-paddle pack using per-paddle cost", () => {
    const twoPack =
      syntheticProduct({
        id: "synthetic-two-pack",
        packSize: 2,
        priceMin: 2000,
        priceMax: 2200
      });

    const result =
      scoreProduct(
        baseInput,
        twoPack,
        1100
      );

    expect(
      result.score
    ).toBeGreaterThanOrEqual(14);

    expect(
      result.reasons
    ).toContain(
      "平均每支價格符合目前預算。"
    );
  });

  it("hard-rejects products that do not match a known venue", () => {
    const outdoorBall =
      syntheticProduct({
        id: "synthetic-outdoor-ball",
        category: "ball",
        venue: ["outdoor"],
        packSize: 3
      });

    const result =
      scoreProduct(
        {
          ...baseInput,
          venue: "indoor"
        },
        outdoorBall
      );

    expect(result.score).toBe(-999);
  });
});

describe("real product catalog", () => {
  it("contains exactly 15 active MVP products", () => {
    expect(products).toHaveLength(15);
    expect(
      products.every(
        (product) => product.active
      )
    ).toBe(true);
  });

  it("contains no mock products", () => {
    expect(
      products.some(
        (product) =>
          product.id.includes("mock") ||
          product.name.includes("Mock")
      )
    ).toBe(false);
  });

  it("keeps source and verification metadata for every product", () => {
    for (const product of products) {
      expect(
        product.sourceUrl.startsWith(
          "https://"
        )
      ).toBe(true);

      expect(
        product.lastVerified
      ).toBe("2026-09-28");

      expect(
        product.priceMin
      ).toBeGreaterThan(0);

      expect(
        product.priceMax
      ).toBeGreaterThanOrEqual(
        product.priceMin
      );
    }
  });
});


describe("scoring v2 behavior", () => {
  it("hard-rejects a paddle whose minimum price exceeds the practical paddle budget", () => {
    const expensive = syntheticProduct({
      id: "synthetic-over-budget",
      priceMin: 1800,
      priceMax: 2000,
      recommendationTier: 1
    });

    const result = scoreProduct(
      baseInput,
      expensive,
      1370
    );

    expect(result.score).toBe(-999);
  });

  it("prefers a tier-2 paddle over a tier-1 paddle for a few-times regular player", () => {
    const input: BuilderInput = {
      ...baseInput,
      experience: "few_times",
      requestedPaddles: 1,
      budget: 5000,
      goal: "regular"
    };

    const tier1 = syntheticProduct({
      id: "tier-1",
      priceMin: 900,
      priceMax: 1000,
      recommendationTier: 1
    });

    const tier2 = syntheticProduct({
      id: "tier-2",
      priceMin: 1700,
      priceMax: 1900,
      recommendationTier: 2
    });

    const tier1Result = scoreProduct(
      input,
      tier1,
      4000
    );

    const tier2Result = scoreProduct(
      input,
      tier2,
      4000
    );

    expect(
      tier2Result.score
    ).toBeGreaterThan(
      tier1Result.score
    );
  });

  it("suppresses product recommendations when the requested setup is over budget", () => {
    const result = buildStarterKit({
      ...baseInput,
      requestedPaddles: 4,
      venue: "self_setup",
      existingEquipment: {
        ...baseInput.existingEquipment,
        badmintonShoes: false,
        netAvailable: false
      },
      budget: 5000
    });

    expect(
      result.warnings.some(
        (warning) =>
          warning.code ===
          "BUDGET_INSUFFICIENT"
      )
    ).toBe(true);

    expect(
      result.productRecommendations
    ).toHaveLength(0);

    expect(
      result.estimatedMaxSpend
    ).toBeGreaterThanOrEqual(
      result.estimatedMinSpend
    );
  });

  it("does not recommend a specific ball product when venue is unknown", () => {
    const result = buildStarterKit({
      ...baseInput,
      venue: "unknown",
      existingEquipment: {
        ...baseInput.existingEquipment,
        balls: false
      }
    });

    expect(
      result.productRecommendations.some(
        (item) =>
          item.product.category ===
          "ball"
      )
    ).toBe(false);
  });
});
