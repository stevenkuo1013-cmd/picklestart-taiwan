import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";

const read = (path: string) => readFileSync(path, "utf8");
const oldUrl = "/guide/taipei-pickleball-courts";

// Tests protect the single Taipei city entry point and the site's primary navigation.
describe("Taipei court guide consolidation", () => {
  it("keeps only the city directory as a public Taipei page", () => {
    expect(existsSync("src/pages/guide/taipei-pickleball-courts.astro")).toBe(false);
    expect(read("src/pages/courts/[city].astro")).toContain('cityData.id === "taipei"');
  });

  it("permanently redirects both old URL spellings on Cloudflare Pages", () => {
    const redirects = read("public/_redirects");
    expect(redirects).toContain(`${oldUrl} /courts/taipei/ 301`);
    expect(redirects).toContain(`${oldUrl}/ /courts/taipei/ 301`);
  });

  it("does not link internally to the retired Taipei guide", () => {
    for (const path of [
      "src/pages/about.astro",
      "src/pages/courts/index.astro",
      "src/data/courts.ts"
    ]) expect(read(path)).not.toContain(oldUrl);
    expect(read("src/pages/about.astro")).toContain('href="/courts/"');
  });

  it("preserves first-time Taipei advice in the city page", () => {
    const city = read("src/pages/courts/[city].astro");
    expect(city).toContain("台北第一次找球局，先確認這 4 件事");
    expect(city).toContain("球拍可以借嗎");
    expect(city).toContain("臺北市網球中心");
  });

  it("removes the recommendation page from the top nav but retains its footer link", () => {
    const header = read("src/components/SiteHeader.astro");
    const footer = read("src/components/SiteFooter.astro");
    expect(header).not.toContain("推薦方式");
    expect(header).toContain("新手配裝工具");
    expect(footer).toContain("推薦方式");
  });
});
