import { products } from "../data/products";
import type {
  BuilderInput,
  ProductCategory
} from "../types";

export interface RequiredCostEstimate {
  min: number;
  max: number;
  notes: string[];
}

export function paddlesToBuy(
  input: BuilderInput
): number {
  return Math.max(
    0,
    input.requestedPaddles -
      input.existingEquipment.paddles
  );
}

export function hasSuitableCourtShoes(
  input: BuilderInput
): boolean {
  const equipment =
    input.existingEquipment;

  return (
    equipment.badmintonShoes ||
    equipment.tennisShoes ||
    equipment.courtShoes
  );
}

export function requiresPortableNet(
  input: BuilderInput
): boolean {
  return (
    input.venue === "self_setup" &&
    !input.existingEquipment.netAvailable
  );
}

function productVenueMatches(
  input: BuilderInput,
  venue: ("indoor" | "outdoor" | "both")[]
): boolean {
  if (input.venue === "unknown") {
    return true;
  }

  if (venue.includes("both")) {
    return true;
  }

  if (input.venue === "indoor") {
    return venue.includes("indoor");
  }

  return venue.includes("outdoor");
}

function catalogPriceRange(
  input: BuilderInput,
  category: ProductCategory
): { min: number; max: number } | null {
  const candidates = products.filter(
    (product) =>
      product.active &&
      product.category === category &&
      productVenueMatches(input, product.venue)
  );

  if (candidates.length === 0) {
    return null;
  }

  return {
    min: Math.min(
      ...candidates.map(
        (product) => product.priceMin
      )
    ),
    max: Math.min(
      ...candidates.map(
        (product) => product.priceMax
      )
    )
  };
}

export function estimateRequiredNonPaddleCost(
  input: BuilderInput
): RequiredCostEstimate {
  let min = 0;
  let max = 0;
  const notes: string[] = [];

  if (!input.existingEquipment.balls) {
    const ballRange =
      catalogPriceRange(input, "ball");

    if (ballRange) {
      min += ballRange.min;
      max += ballRange.max;
    }

    notes.push(
      "預留一小包匹克球的預算。"
    );
  }

  if (requiresPortableNet(input)) {
    const netRange =
      catalogPriceRange(input, "net");

    if (netRange) {
      min += netRange.min;
      max += netRange.max;
    }

    notes.push(
      "自備場地且沒有球網，需要預留攜帶式球網預算。"
    );
  }

  const shoesNeededForRegularUse =
    !hasSuitableCourtShoes(input) &&
    (
      input.experience === "weekly" ||
      input.experience === "serious" ||
      input.goal === "improve" ||
      input.goal === "competitive"
    );

  if (shoesNeededForRegularUse) {
    const shoeRange =
      catalogPriceRange(input, "shoes");

    if (shoeRange) {
      min += shoeRange.min;
      max += shoeRange.max;
    }

    notes.push(
      "固定打球情境下，預留場地鞋預算。"
    );
  }

  return {
    min,
    max,
    notes
  };
}
