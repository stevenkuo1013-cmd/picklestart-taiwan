import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { coachDirectory } from "../src/data/coaches";
const read = (p: string) => readFileSync(p, "utf8");

describe("V4.20 Elvin group class and coach directory SEO", () => {
  it("adds group teaching for Elvin and preserves the existing nine coaches", () => {
    const elvin = coachDirectory.find((c) => c.id === "elvin-taipei");
    expect(coachDirectory).toHaveLength(9);
    expect(elvin?.formats).toEqual(["一對一", "雙人", "團體"]);
    expect(elvin?.introduction).toContain("團體課程");
  });
  it("keeps the existing canonical coach directory and makes actual cities discoverable", () => {
    const index = read("src/pages/coaches/index.astro");
    expect(index).toContain("依縣市找匹克球教練");
    expect(index).toContain("coachCityCounts");
    expect(index).toContain("encodeURIComponent(city)");
    expect(index).toContain('new URLSearchParams(window.location.search).get("city")');
    expect(index).toContain('noindex,follow'); // empty site fallback remains
  });
  it("adds practical advice instead of generating empty city doorway pages", () => {
    const index = read("src/pages/coaches/index.astro");
    expect(index).toContain("第一次找匹克球教練，怎麼選？");
    expect(index).toContain('href="/courts/"');
  });
  it("links each city venue guide to coaches only where a real coach is published", () => {
    const court = read("src/pages/courts/[city].astro");
    expect(court).toContain('"taipei": "臺北市"');
    expect(court).toContain('"new-taipei": "新北市"');
    expect(court).toContain("cityCoachCount > 0");
    expect(court).toContain("encodeURIComponent(linkedCoachCity)");
  });
  it("improves individual coach title and visible cross-navigation", () => {
    const p = read("src/pages/coaches/[slug].astro");
    expect(p).toContain("匹克球教練與教學資訊");
    expect(p).toContain("coach-profile-area-nav");
    expect(p).toContain("coach.cities.map");
  });
});
