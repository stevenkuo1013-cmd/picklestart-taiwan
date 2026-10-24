import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const file = (name: string) => readFileSync(name, "utf8");
const header = file("src/components/SiteHeader.astro");
const home = file("src/pages/index.astro");
const css = file("src/styles/public.css");

describe("V4.16 mobile navigation and homepage simplification", () => {
  it("uses a keyboard-accessible native disclosure menu with five destinations", () => {
    expect(header).toContain('<details class="mobile-menu">');
    expect(header).toContain('<summary aria-label="網站選單">');
    const panel = header.split('<nav class="mobile-menu-panel"')[1]?.split("</nav>")[0] ?? "";
    expect((panel.match(/<a\b/g) ?? [])).toHaveLength(5);
    for (const destination of ['href="/"', 'href="/guide/"', 'href="/courts/"', 'href="/builder/?from=mobile_nav"', 'href="/about/"']) {
      expect(panel).toContain(destination);
    }
  });
  it("keeps the builder tracking attributes in both header and mobile menu", () => {
    expect(header).toContain('data-analytics-placement="header_cta"');
    expect(header).toContain('data-analytics-placement="mobile_nav"');
    expect(header).toContain('data-analytics-event="site_builder_clicked"');
    expect(header).not.toContain("推薦方式");
  });
  it("closes the mobile menu on Escape and clicking outside", () => {
    expect(header).toContain('event.key === "Escape"');
    expect(header).toContain('!mobileMenu.contains(event.target)');
    expect(header).toContain('mobileMenu.open = false');
  });
  it("preserves desktop navigation while replacing tablet horizontal overflow", () => {
    expect(header).toContain('<nav class="site-nav"');
    expect(css).toContain('@media (max-width: 1040px)');
    expect(css).toContain('.site-nav { display: none; }');
    expect(css).toContain('.mobile-menu-panel');
  });
  it("shows one sample result only and retains core homepage journeys", () => {
    expect(home).toContain('class="starter-preview-card starter-preview-v3 preview-compact"');
    expect(home).not.toContain('class="sample-result sample-result-v3"');
    expect(home).not.toContain('class="sample-product-grid"');
    expect(home).toContain('class="flow-grid flow-grid-v3"');
    expect(home).toContain('class="why-strip why-strip-v3"');
    expect(home).toContain('class="visual-guide-grid visual-guide-grid-v3"');
    expect(home).toContain('data-home-placement="final_cta"');
    expect(home).toContain('data-home-placement="hero"');
  });
});
