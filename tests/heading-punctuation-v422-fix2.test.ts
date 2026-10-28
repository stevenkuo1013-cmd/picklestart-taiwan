import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
function collectAstro(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const path = join(dir, d.name);
    return d.isDirectory() ? collectAstro(path) : d.isFile() && d.name.endsWith(".astro") ? [path] : [];
  });
}
const read = (p: string) => readFileSync(join(root, p), "utf8");

describe("V4.22 Fix2 — headings without Chinese full stops", () => {
  it("does not use 。 inside literal H1–H6 headings anywhere in src", () => {
    let headingCount = 0;
    for (const file of collectAstro(join(root, "src"))) {
      const source = readFileSync(file, "utf8");
      const heads = [...source.matchAll(/<h([1-6])(?:\s[^>]*?)?>([\s\S]*?)<\/h\1\s*>/gi)];
      for (const [, level, body] of heads) {
        headingCount++;
        expect(body, `${file} H${level}`).not.toContain("。");
      }
    }
    expect(headingCount).toBeGreaterThan(100);
  });
  it("also removes 。 from dynamic GuideEndCTA H2 heading props", () => {
    let count = 0;
    for (const file of collectAstro(join(root, "src"))) {
      const source = readFileSync(file, "utf8");
      for (const [, title] of source.matchAll(/\bheading="([^"]*)"/g)) {
        count++;
        expect(title, file).not.toContain("。");
      }
    }
    expect(count).toBeGreaterThanOrEqual(11);
  });
  it("keeps question marks and existing line-break structure on guide headlines", () => {
    expect(read("src/pages/guide/index.astro")).toContain('第一次接觸匹克球？<br /><span>從這裡開始</span>');
    expect(read("src/pages/guide/pickleball-paddle.astro")).toContain('第一次買匹克球拍？<br />先挑順手的');
    expect(read("src/pages/guide/dink-guide.astro")).toContain('Kitchen 還沒完全懂？先回去看那篇');
  });
  it("keeps the home 3-step heading unchanged", () => {
    expect(read("src/pages/index.astro")).toContain('3 步驟</span>，找到你的起步裝備');
  });
});
