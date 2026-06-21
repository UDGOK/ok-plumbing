import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

test("light theme defines all tokens from spec §3", () => {
  const lightBlock = css.match(/:root\s*{([\s\S]*?)}/)?.[1] ?? "";
  const expected = [
    "--background",
    "--surface",
    "--surface-muted",
    "--foreground",
    "--foreground-muted",
    "--accent",
    "--accent-foreground",
    "--brass",
    "--brass-foreground",
    "--border",
    "--ring",
    "--radius",
    "--radius-lg",
    "--radius-sm",
  ];
  for (const token of expected) {
    expect(lightBlock, `missing ${token} in :root`).toContain(token);
  }
});

test("dark theme mirrors tokens under [data-theme=dark] or .dark", () => {
  const darkBlock =
    css.match(/(?:\[data-theme="dark"\]|\.dark)\s*{([\s\S]*?)}/)?.[1] ?? "";
  expect(darkBlock.length, "dark theme block not found").toBeGreaterThan(100);
  expect(darkBlock).toContain("--background");
  expect(darkBlock).toContain("--accent");
});

test("palette B hex values are present", () => {
  expect(css.toLowerCase()).toContain("#efeeea"); // linen
  expect(css.toLowerCase()).toContain("#3f7a6b"); // verdigris
  expect(css.toLowerCase()).toContain("#b08d43"); // patina brass
  expect(css.toLowerCase()).toContain("#222b2f"); // charcoal
});
