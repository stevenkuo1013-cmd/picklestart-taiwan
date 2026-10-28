import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const read = (name: string) => readFileSync(name, "utf8");
describe("V4.21 scoped visual + copy cleanup", () => {
  it("uses plain, readable homepage heading without trailing period", () => {
    const home = read("src/pages/index.astro");
    expect(home).toContain("第一套裝備</span>");
    expect(home).toContain("少買錯裝備");
    expect(home).not.toContain("第一套裝備。</span>");
  });
  it("retains all original journeys and tracking attributes", () => {
    const home = read("src/pages/index.astro");
    for (const token of ['data-home-placement="hero"','data-home-placement="final_cta"','class="flow-grid flow-grid-v3"','class="visual-guide-grid visual-guide-grid-v3"','class="starter-preview-card starter-preview-v3 preview-compact"']) {
      expect(home).toContain(token);
    }
    expect(home).not.toContain('class="sample-product-grid"');
  });
  it("has a court hero focused on filtering and avoids duplicate long tips", () => {
    const hub = read("src/pages/courts/index.astro");
    expect(hub).toContain("依縣市找球館與球聚");
    expect(hub).toContain("展開縣市，查看場地、費用、球聚時間與資料來源");
    expect(hub).not.toContain("找到你真的能去打的地方。");
  });
  it("retains important court data, source notices and core filter IDs", () => {
    const hub = read("src/pages/courts/index.astro");
    for(const token of ['id="court-search"','id="court-city-filters"','id="court-ownership-filters"','id="court-type-filters"','data-city-description','data-original-description','place.schedule','place.fee','place.access','getCourtMapAction']) expect(hub).toContain(token);
  });
  it("only adds scoped homepage and court CSS, not a global typography override", () => {
    const css=read("src/styles/public.css");
    const guide=read("src/styles/guide.css");
    expect(css).toContain("V4.21 · Homepage readability only");
    expect(guide).toContain("V4.21 · Court hub readability only");
    expect(css).toContain(".hero-v3 h1.hero-title-v4 .hero-title-teal");
    expect(guide).toContain(".courts-v2-page .courts-v2-hero h1");
  });
  it("keeps the site builder, court links and SEO field names untouched", () => {
    const home=read("src/pages/index.astro");
    const hub=read("src/pages/courts/index.astro");
    expect(home).toContain('title="匹克球新手裝備推薦｜60 秒配好第一套裝備｜PickleStart Taiwan"');
    expect(hub).toContain('dateModified={COURT_LAST_UPDATED_AT}');
    expect(hub).toContain('getCourtMapAction');
  });
});
