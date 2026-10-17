import { expect, test } from "@playwright/test";

const LOCALES = ["en", "es"] as const;

for (const locale of LOCALES) {
  test.describe(`intro ${locale}`, () => {
    test("centred paragraph, decorative dot, no links or buttons", async ({ page }) => {
      await page.goto(`/${locale}`);
      const intro = page.locator("#intro");
      await intro.scrollIntoViewIfNeeded();
      await expect(intro.locator("p")).toHaveCSS("text-align", "center");
      await expect(intro.locator("a, button")).toHaveCount(0);
      const dot = intro.locator('span[aria-hidden="true"]');
      await expect(dot).toHaveCSS("width", "8px");
      await expect(dot).toHaveCSS("height", "8px");
    });

    test("reveals once when entering the viewport", async ({ page }) => {
      await page.goto(`/${locale}`);
      const block = page.locator("#intro .reveal");
      await expect(block).toHaveAttribute("data-shown", "false");
      await page.locator("#intro").scrollIntoViewIfNeeded();
      await expect(block).toHaveAttribute("data-shown", "true");
      await expect.poll(() => block.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
    });

    test.describe("reduced motion", () => {
      test.use({ reducedMotion: "reduce" });
      test("paragraph is visible without animation", async ({ page }) => {
        await page.goto(`/${locale}`);
        await expect(page.locator("#intro .reveal")).toHaveCSS("opacity", "1");
        await expect(page.locator("#intro .reveal")).toHaveCSS("transition-duration", "0s");
      });
    });

    test("screenshot", async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.locator("#intro").scrollIntoViewIfNeeded();
      await expect(page.locator("#intro .reveal")).toHaveAttribute("data-shown", "true");
      await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
      await expect(page.locator("#intro")).toHaveScreenshot(`intro-${locale}.png`, { animations: "disabled" });
    });
  });
}
