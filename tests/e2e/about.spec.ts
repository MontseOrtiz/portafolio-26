import { expect, test } from "@playwright/test";

const copy = {
  en: { h1: "Montse Ortiz (Frontend / Full Stack Developer)", contact: "Contact", cv: "CV" },
  es: { h1: "Montse Ortiz (Frontend / Full Stack Developer)", contact: "Contacto", cv: "CV" },
} as const;

for (const locale of ["en", "es"] as const) {
  const c = copy[locale];

  test.describe(`about ${locale}`, () => {
    test("h1 with name and role, 3–5 bio paragraphs, two buttons", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.h1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-weight", "500");
      const paragraphs = await page.locator("#about p").count();
      expect(paragraphs).toBeGreaterThanOrEqual(3);
      expect(paragraphs).toBeLessThanOrEqual(5);

      const contact = page.locator("#about").getByRole("link", { name: c.contact, exact: true });
      await expect(contact).toHaveAttribute("href", `/${locale}#contact`);
      const cv = page.locator("#about").getByRole("link", { name: c.cv, exact: true });
      await expect(cv).toHaveAttribute("href", "#cv");
    });

    test("avatar has a descriptive alt; decorative elements are aria-hidden", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      const img = page.locator("#about img");
      await expect(img).toHaveCount(1);
      expect((await img.getAttribute("alt"))!.length).toBeGreaterThan(20);
      await expect(page.locator("#about .pattern-gingham")).toHaveAttribute("aria-hidden", "true");
    });

    test("nav About is current on this page and the CV button scrolls to #cv", async ({ page }, testInfo) => {
      await page.goto(`/${locale}/about`);
      if (testInfo.project.name === "mobile") await page.getByRole("button", { name: /menu|menú/i }).click();
      await expect(page.getByRole("navigation", { name: /Main navigation|Navegación principal/ }).getByRole("link", { name: /About|Sobre/ })).toHaveAttribute("aria-current", "page");
    });
  });
}

test("CV button jumps to #cv on the same page", async ({ page }) => {
  await page.goto("/en/about");
  await page.locator("#about").getByRole("link", { name: "CV", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about#cv$/);
});

test.describe("layout", () => {
  test("desktop: two columns 7/5 with a bordered card; mobile: one column, collage last", async ({ page }, testInfo) => {
    await page.goto("/en/about");
    const card = page.locator("#about");
    await expect(card).toHaveCSS("border-top-width", "1px");
    const text = (await card.locator("> div").first().boundingBox())!;
    const collage = (await page.getByRole("group", { name: "Collage of images about Montse" }).boundingBox())!;
    if (testInfo.project.name === "desktop") {
      expect(collage.x).toBeGreaterThan(text.x + text.width - 1);
      expect(Math.abs(collage.y - text.y)).toBeLessThan(2);
      // El collage ocupa 5 de 12 columnas del contenido de la tarjeta (el texto queda limitado a `measure`).
      const inner = (await card.boundingBox())!.width - 64;
      expect(collage.width / inner).toBeGreaterThan(0.39);
      expect(collage.width / inner).toBeLessThan(0.42);
    } else {
      expect(collage.y).toBeGreaterThan(text.y + text.height - 1);
      expect(collage.width).toBeLessThanOrEqual(288);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test("bio is capped at the measure token", async ({ page }) => {
    await page.goto("/en/about");
    const width = await page.locator("#about p").first().evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBeLessThanOrEqual(560);
  });
});

test.describe("collage", () => {
  test("images tilt positive and negative and straighten on hover (desktop)", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "hover needs a pointer");
    await page.goto("/en/about");
    const group = page.getByRole("group", { name: "Collage of images about Montse" });
    await group.scrollIntoViewIfNeeded();
    await expect(group.locator(".reveal[data-shown='true']")).toHaveCount(2);
    const tilted = group.locator("div[class*='rotate-']");
    const rotations = await tilted.evaluateAll((els) => els.map((el) => getComputedStyle(el).rotate));
    expect(rotations.some((r) => r === "3deg")).toBe(true);
    expect(rotations.some((r) => r === "-6deg")).toBe(true);

    const avatar = group.locator("div:has(> img)");
    await avatar.hover();
    await expect.poll(() => avatar.evaluate((el) => getComputedStyle(el).rotate)).toMatch(/^(0deg|none)$/);
  });

  test("images enter one after another (staggered delays)", async ({ page }) => {
    await page.goto("/en/about");
    const delays = await page
      .getByRole("group", { name: "Collage of images about Montse" })
      .locator(".reveal")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).transitionDelay));
    expect(new Set(delays).size).toBe(2);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("everything is visible without transitions", async ({ page }) => {
    await page.goto("/en/about");
    for (const el of await page.locator("#about .reveal").all()) {
      await expect(el).toHaveCSS("opacity", "1");
      await expect(el).toHaveCSS("transition-duration", "0s");
    }
  });
});

test.describe("screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  for (const locale of ["en", "es"] as const) {
    for (const scheme of ["light", "dark"] as const) {
      test.describe(`${locale} ${scheme}`, () => {
        test.use({ colorScheme: scheme });
        test(`about ${locale} ${scheme}`, async ({ page }) => {
          await page.goto(`/${locale}/about`);
          await page.evaluate(() => document.fonts.ready);
          await expect(page.locator("#about img")).toHaveJSProperty("complete", true);
          await expect(page.locator("#about")).toHaveScreenshot(`about-${locale}-${scheme}.png`, { animations: "disabled", mask: [page.getByRole("banner")] });
        });
      });
    }
  }
});
