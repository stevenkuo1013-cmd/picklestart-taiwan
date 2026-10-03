import { describe, expect, it } from "vitest";
import { buildStarterKit } from "../src/logic/recommendation";
import type { BuilderInput } from "../src/types";

const baseEquipment = {
  paddles: 0,
  balls: false,
  badmintonShoes: true,
  tennisShoes: false,
  courtShoes: false,
  netAvailable: true
};

describe("recommended spend ranges", () => {
  it("A uses the actual top beginner paddle plus outdoor balls", () => {
    const input: BuilderInput = {
      experience: "first_time",
      requestedPaddles: 2,
      venue: "outdoor_court",
      existingEquipment: { ...baseEquipment },
      budget: 3000,
      goal: "casual"
    };

    const result = buildStarterKit(input);

    expect(result.estimatedMinSpend).toBe(1915);
    expect(result.estimatedMaxSpend).toBe(2260);
  });

  it("B reflects the tier-2 paddle actually recommended", () => {
    const input: BuilderInput = {
      experience: "few_times",
      requestedPaddles: 1,
      venue: "outdoor_court",
      existingEquipment: { ...baseEquipment },
      budget: 5000,
      goal: "regular"
    };

    const result = buildStarterKit(input);

    expect(result.estimatedMinSpend).toBe(1529);
    expect(result.estimatedMaxSpend).toBe(1599);
  });

  it("C reflects serious-player paddle, indoor balls, and court shoes", () => {
    const input: BuilderInput = {
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
    };

    const result = buildStarterKit(input);

    expect(result.estimatedMinSpend).toBe(5454);
    expect(result.estimatedMaxSpend).toBe(6199);
  });

  it("D keeps the minimum feasible range when budget is insufficient", () => {
    const input: BuilderInput = {
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
    };

    const result = buildStarterKit(input);

    expect(result.estimatedMinSpend).toBe(9555);
    expect(result.estimatedMaxSpend).toBe(10200);
    expect(result.productRecommendations).toHaveLength(0);
  });

  it("E reflects the single tier-2 paddle recommendation", () => {
    const input: BuilderInput = {
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
    };

    const result = buildStarterKit(input);

    expect(result.estimatedMinSpend).toBe(1249);
    expect(result.estimatedMaxSpend).toBe(1249);
  });
});


describe("spend breakdown", () => {
  it("explains that two requested paddles use the same top recommendation twice", () => {
    const input: BuilderInput = {
      experience: "first_time",
      requestedPaddles: 2,
      venue: "outdoor_court",
      existingEquipment: { ...baseEquipment },
      budget: 3000,
      goal: "casual"
    };

    const result = buildStarterKit(input);
    const paddle = result.spendBreakdown.find(
      (item) => item.category === "paddle"
    );

    expect(paddle?.unitsNeeded).toBe(2);
    expect(paddle?.packsNeeded).toBe(2);
    expect(paddle?.lineMin).toBe(
      (paddle?.packPriceMin ?? 0) * 2
    );
  });

  it("records ball demand as three usable balls while respecting package size", () => {
    const input: BuilderInput = {
      experience: "first_time",
      requestedPaddles: 2,
      venue: "outdoor_court",
      existingEquipment: { ...baseEquipment },
      budget: 3000,
      goal: "casual"
    };

    const result = buildStarterKit(input);
    const ball = result.spendBreakdown.find(
      (item) => item.category === "ball"
    );

    expect(ball?.unitsNeeded).toBe(3);
    expect(ball?.packsNeeded).toBeGreaterThanOrEqual(1);
    expect(
      (ball?.packSize ?? 0) * (ball?.packsNeeded ?? 0)
    ).toBeGreaterThanOrEqual(3);
  });

  it("breakdown totals match the displayed estimated spend", () => {
    const input: BuilderInput = {
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
    };

    const result = buildStarterKit(input);

    expect(
      result.spendBreakdown.reduce(
        (sum, item) => sum + item.lineMin,
        0
      )
    ).toBe(result.estimatedMinSpend);

    expect(
      result.spendBreakdown.reduce(
        (sum, item) => sum + item.lineMax,
        0
      )
    ).toBe(result.estimatedMaxSpend);
  });
});
