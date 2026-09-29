import { describe, expect, it } from "vitest";
import { buildEventPath } from "../src/lib/analytics";

describe("analytics event paths", () => {
  it("normalizes event names", () => {
    expect(buildEventPath("Builder Started")).toBe("builder_started");
  });

  it("adds sorted non-personal properties", () => {
    expect(
      buildEventPath("affiliate_clicked", {
        rank: 1,
        category: "paddle",
        product: "infin-t700"
      })
    ).toBe(
      "affiliate_clicked|category=paddle|product=infin-t700|rank=1"
    );
  });

  it("drops empty properties", () => {
    expect(
      buildEventPath("result_viewed", {
        value: undefined,
        other: null
      })
    ).toBe("result_viewed");
  });

  it("sanitizes unsafe characters", () => {
    expect(
      buildEventPath("Product Click!", {
        product: "HEAD Radical TEAM 15 2026"
      })
    ).toBe("product_click-|product=head_radical_team_15_2026");
  });
});
