import { describe, expect, it } from "vitest";
import { buildStarterKit } from "../src/logic/recommendation";
import type { BuilderInput } from "../src/types";

interface Scenario {
  name: string;
  input: BuilderInput;
}

const scenarios: Scenario[] = [
  {
    name: "A｜兩人第一次戶外休閒，已有羽球鞋，預算 3000",
    input: {
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
    }
  },
  {
    name: "B｜一人打過幾次，戶外，每週休閒，預算 5000",
    input: {
      experience: "few_times",
      requestedPaddles: 1,
      venue: "outdoor_court",
      existingEquipment: {
        paddles: 0,
        balls: false,
        badmintonShoes: true,
        tennisShoes: false,
        courtShoes: false,
        netAvailable: true
      },
      budget: 5000,
      goal: "regular"
    }
  },
  {
    name: "C｜一人認真訓練，室內，沒有場地鞋，預算 8000",
    input: {
      experience: "serious",
      requestedPaddles: 1,
      venue: "indoor",
      existingEquipment: {
        paddles: 0,
        balls: false,
        badmintonShoes: false,
        tennisShoes: false,
        courtShoes: false,
        netAvailable: true
      },
      budget: 8000,
      goal: "competitive"
    }
  },
  {
    name: "D｜四人第一次自架場地，什麼都沒有，預算 5000",
    input: {
      experience: "first_time",
      requestedPaddles: 4,
      venue: "self_setup",
      existingEquipment: {
        paddles: 0,
        balls: false,
        badmintonShoes: false,
        tennisShoes: false,
        courtShoes: false,
        netAvailable: false
      },
      budget: 5000,
      goal: "casual"
    }
  },
  {
    name: "E｜已有一支球拍與球，只缺一支，場地未知，預算 3000",
    input: {
      experience: "few_times",
      requestedPaddles: 2,
      venue: "unknown",
      existingEquipment: {
        paddles: 1,
        balls: true,
        badmintonShoes: true,
        tennisShoes: false,
        courtShoes: false,
        netAvailable: true
      },
      budget: 3000,
      goal: "regular"
    }
  }
];

function printScenario(
  scenario: Scenario
) {
  const result =
    buildStarterKit(
      scenario.input
    );

  const recommendedProducts =
    result.productRecommendations.map(
      (item) => ({
        name:
          item.product.name,

        category:
          item.product.category,

        tier:
          item.product
            .recommendationTier ??
          "-",

        price:
          `NT$${item.product.priceMin}-${item.product.priceMax}`,

        score:
          item.score,

        reasons:
          item.reasons.join(
            " / "
          )
      })
    );

  console.log(
    "\n=================================================="
  );

  console.log(
    scenario.name
  );

  console.log(
    "=================================================="
  );

  console.log(
    `Estimated spend: NT$${result.estimatedMinSpend} - NT$${result.estimatedMaxSpend}`
  );

  console.log(
    "Buy now:",
    result.buyNow.map(
      (item) =>
        `${item.label}${item.quantity ? ` x${item.quantity}` : ""}`
    )
  );

  console.log(
    "Already have:",
    result.alreadyHave.map(
      (item) =>
        item.label
    )
  );

  console.log(
    "Optional later:",
    result.optionalLater.map(
      (item) =>
        item.label
    )
  );

  console.log(
    "Skip now:",
    result.skipForNow.map(
      (item) =>
        item.label
    )
  );

  console.log(
    "Warnings:",
    result.warnings.map(
      (warning) =>
        warning.code
    )
  );

  console.log(
    "Recommended products:"
  );

  console.table(
    recommendedProducts
  );

  return result;
}

describe(
  "recommendation quality assurance scenarios",
  () => {
    it(
      scenarios[0].name,
      () => {
        const result =
          printScenario(
            scenarios[0]
          );

        const paddles =
          result.productRecommendations.filter(
            (item) =>
              item.product.category ===
              "paddle"
          );

        expect(
          paddles[0]?.product.id
        ).toBe(
          "infin-colorful-paddle"
        );

        expect(
          paddles.every(
            (item) =>
              item.product.priceMin <=
              1372.5
          )
        ).toBe(true);
      }
    );

    it(
      scenarios[1].name,
      () => {
        const result =
          printScenario(
            scenarios[1]
          );

        const firstPaddle =
          result.productRecommendations.find(
            (item) =>
              item.product.category ===
              "paddle"
          );

        expect(
          firstPaddle?.product
            .recommendationTier
        ).toBe(2);
      }
    );

    it(
      scenarios[2].name,
      () => {
        const result =
          printScenario(
            scenarios[2]
          );

        const firstPaddle =
          result.productRecommendations.find(
            (item) =>
              item.product.category ===
              "paddle"
          );

        expect(
          firstPaddle?.product
            .recommendationTier
        ).toBe(4);
      }
    );

    it(
      scenarios[3].name,
      () => {
        const result =
          printScenario(
            scenarios[3]
          );

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
      }
    );

    it(
      scenarios[4].name,
      () => {
        const result =
          printScenario(
            scenarios[4]
          );

        const firstPaddle =
          result.productRecommendations.find(
            (item) =>
              item.product.category ===
              "paddle"
          );

        expect(
          firstPaddle?.product
            .recommendationTier
        ).toBe(2);

        expect(
          result.buyNow.filter(
            (item) =>
              item.category ===
              "paddle"
          )[0]?.quantity
        ).toBe(1);

        expect(
          result.buyNow.some(
            (item) =>
              item.category ===
              "ball"
          )
        ).toBe(false);
      }
    );
  }
);
