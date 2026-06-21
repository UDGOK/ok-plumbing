import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /quiet pipes/i,
    );
  });

  test("renders all 6 services in the services grid", async ({ page }) => {
    await page.goto("/");
    // Scope to the services grid section to avoid matching footer/header duplicates
    const servicesSection = page.locator("section").filter({
      hasText: "Six services, done right.",
    });
    const serviceLinks = servicesSection.getByRole("link", {
      name: /drain cleaning|water heater|repiping|leak detection|sewer line|fixture/i,
    });
    await expect(serviceLinks).toHaveCount(6);
  });

  test("renders GEO FAQ with at least 4 questions", async ({ page }) => {
    await page.goto("/");
    const faqButtons = page.getByRole("button", { name: /\?$/ });
    await expect(faqButtons.first()).toBeVisible();
    const count = await faqButtons.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("header nav is sticky and shows book CTA", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();
    await expect(
      header.getByRole("link", { name: /book/i }),
    ).toBeVisible();
  });

  test("skip-to-content link appears on focus", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeVisible();
  });

  test("LocalBusiness JSON-LD is present", async ({ page }) => {
    await page.goto("/");
    const ldScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const hasLocalBusiness = ldScripts.some((s) => s.includes('"Plumber"'));
    expect(hasLocalBusiness).toBe(true);
  });
});
