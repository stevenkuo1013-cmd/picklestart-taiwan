import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { coachDirectory, COACH_CITIES, type CoachProfile } from "../src/data/coaches";
import { coachContacts, filterCoaches, isPublishableCoach, publishedCoaches, safeCoachLink } from "../src/lib/coach-directory";
import { getCoachClickEvent } from "../src/lib/coach-analytics";

const read = (file: string) => readFileSync(file, "utf8");
const sample: CoachProfile = {
  id: "coach-example-taipei", approved: true, active: true,
  displayName: "測試教練", cities: ["臺北市"], teachingAreas: ["臺北市中山區"],
  levels: ["零基礎", "初學"], formats: ["一對一"],
  introduction: "這是僅在自動化測試中使用的示範教練。", lastConfirmed: "2026-10-24",
  line: "https://lin.ee/example123", instagram: "https://www.instagram.com/examplecoach/"
};

describe("V4.17 approved public coach directory", () => {
  it("loads only manually approved and publishable real coach profiles", () => {
    expect(coachDirectory).toHaveLength(9);
    expect(publishedCoaches(coachDirectory)).toHaveLength(9);
    expect(coachDirectory.every(coach => coach.approved && coach.active)).toBe(true);
    expect(coachDirectory.every(coach => coach.teachingAreas.join('、') === coach.cities.join('、'))).toBe(true);
  });
  it("provides Taiwan regions for the city filter", () => {
    expect(COACH_CITIES).toContain("臺北市");
    expect(COACH_CITIES).toContain("臺南市");
    expect(COACH_CITIES).toContain("金門縣");
    expect(COACH_CITIES).toHaveLength(22);
  });
  it("requires manual approval and at least one trusted social contact", () => {
    expect(isPublishableCoach(sample)).toBe(true);
    expect(isPublishableCoach({ ...sample, approved: false })).toBe(false);
    expect(isPublishableCoach({ ...sample, active: false })).toBe(false);
    expect(isPublishableCoach({ ...sample, line: undefined, instagram: undefined })).toBe(false);
    expect(isPublishableCoach({ ...sample, line: "https://scam.invalid/" , instagram: undefined })).toBe(false);
    expect(isPublishableCoach({ ...sample, teachingAreas: [] })).toBe(false);
  });
  it("filters unapproved entries and duplicate ids", () => {
    expect(publishedCoaches([sample, { ...sample, id: "inactive", approved: false }, sample])).toHaveLength(1);
  });
  it("filters by city, level and keyword", () => {
    const other = { ...sample, id: "coach-example-tainan", cities: ["臺南市"] as CoachProfile["cities"], teachingAreas: ["臺南市東區"], levels: ["進階"] as CoachProfile["levels"] };
    expect(filterCoaches([sample, other], { city: "臺北市" })).toHaveLength(1);
    expect(filterCoaches([sample, other], { city: "臺南市", level: "初學" })).toHaveLength(0);
    expect(filterCoaches([sample, other], { query: "中山" })).toHaveLength(1);
  });
  it("allows legitimate IG, Facebook and LINE links including invite links", () => {
    expect(safeCoachLink("instagram", "https://instagram.com/coach.example/")).not.toBeNull();
    expect(safeCoachLink("facebook", "https://www.facebook.com/coach.example/")).not.toBeNull();
    expect(safeCoachLink("line", "https://lin.ee/abcd1234")).not.toBeNull();
    expect(safeCoachLink("line", "https://line.me/R/ti/p/@coach-abc")).not.toBeNull();
    expect(safeCoachLink("line", "https://line.me/ti/p/abcDE")).not.toBeNull();
    expect(coachContacts(sample).map((x) => x.network)).toEqual(["instagram", "line"]);
    expect(safeCoachLink("instagram", "https://reurl.cc/rkqEqN")).toBe("https://reurl.cc/rkqEqN");
    expect(safeCoachLink("facebook", "https://reurl.cc/rkqEqN")).toBeNull();
    expect(safeCoachLink("instagram", "https://reurl.cc/notApproved")).toBeNull();
    expect(safeCoachLink("instagram", "https://reurl.cc/rkqEqN?changed=1")).toBeNull();
  });
  it("rejects phishing and unsafe links", () => {
    for (const url of ["javascript:alert(1)", "http://lin.ee/abc", "https://lin.ee.evil.com/abc", "https://line.me.evil.com/R/ti/p/a", "https://google.com/line.me", "https://line.me/whatever"]) {
      expect(safeCoachLink("line", url)).toBeNull();
    }
    expect(safeCoachLink("instagram", "https://instagram.com.evil.com/coach")).toBeNull();
    expect(safeCoachLink("facebook", "https://facebook.com@evil.com/x")).toBeNull();
  });
  it("tracks public coach id and channel without contact values", () => {
    expect(getCoachClickEvent("coach-example-taipei", "line")).toEqual({ name: "coach_contact_clicked", props: { coach: "coach-example-taipei", channel: "line" } });
    expect(getCoachClickEvent("../../secret", "line")).toBeNull();
    expect(getCoachClickEvent("coach-example-taipei", "email")).toBeNull();
  });
  it("provides an honest noindex empty state and Tally-only form configuration", () => {
    const index = read("src/pages/coaches/index.astro");
    expect(index).toContain('noindex,follow');
    expect(index).toContain("尚無公開教練名單");
    expect(index).toContain("COACH_FORM_URL");
    expect(index).toContain("聯絡與課程安排說明");
    expect(read("src/data/coach-form.ts")).toMatch(/COACH_FORM_URL = "(?:https:\/\/tally\.so\/r\/[A-Za-z0-9]+)?"/);
  });
  it("adds navigable public profiles without building fake personal pages", () => {
    expect(existsSync("src/pages/coaches/[slug].astro")).toBe(true);
    expect(read("src/pages/coaches/[slug].astro")).toContain("publishedCoaches(coachDirectory)");
    expect(read("src/components/SiteHeader.astro")).toContain('href="/coaches/"');
    expect(read("src/components/SiteFooter.astro")).toContain('href="/coaches/"');
    expect(read("src/components/SiteFooter.astro")).toContain("推薦方式");
    expect(read("src/layouts/BaseLayout.astro")).toContain('content={robots}');
  });
  it("preserves the V4.16 mobile menu and builder CTA", () => {
    const header = read("src/components/SiteHeader.astro");
    const menu = header.split('<nav class="mobile-menu-panel"')[1]?.split("</nav>")[0] || "";
    expect((menu.match(/<a\b/g) || []).length).toBe(6);
    expect(menu).toContain('href="/coaches/"');
    expect(header).toContain('data-analytics-placement="header_cta"');
    expect(read("src/pages/index.astro")).not.toContain('class="sample-product-grid"');
  });
});
