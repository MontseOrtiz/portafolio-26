import { expect, test } from "@playwright/test";

const copy = {
  en: { concept: "Concept project", demo: "Live demo", problem: "Problem", role: "My role", decisions: "Technical decisions", result: "Result", prev: "Previous", next: "Next" },
  es: { concept: "Proyecto conceptual", demo: "Demo en vivo", problem: "Problema", role: "Mi rol", decisions: "Decisiones técnicas", result: "Resultado", prev: "Anterior", next: "Siguiente" },
} as const;
const names = { "book-diary": "Book Diary", "wod-tracker": "WOD Tracker", "destino-china": "Destino China" } as const;
type Slug = keyof typeof names;
const slugs = Object.keys(names) as Slug[];

for (const locale of ["en", "es"] as const) {
  const c = copy[locale];

  test.describe(`case study ${locale}`, () => {
    for (const slug of slugs) {
      test(`${slug}: h1, summary links and the four blocks`, async ({ page }) => {
        await page.goto(`/${locale}/projects/${slug}`);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(names[slug]);
        for (const title of [c.problem, c.role, c.decisions, c.result]) {
          await expect(page.getByRole("heading", { level: 2, name: title })).toBeAttached();
        }
        const demo = page.getByRole("link", { name: new RegExp(c.demo) });
        await expect(demo).toHaveAttribute("target", "_blank");
        await expect(demo).toHaveAttribute("rel", /noopener/);
        // Aún no hay repos: el link no se muestra.
        await expect(page.getByRole("link", { name: /^Repo/ })).toHaveCount(0);
      });
    }

    test("only Destino China has the concept badge", async ({ page }) => {
      for (const slug of slugs) {
        await page.goto(`/${locale}/projects/${slug}`);
        await expect(page.getByText(c.concept, { exact: true })).toHaveCount(slug === "destino-china" ? 1 : 0);
      }
    });

    test("Previous / Next cycle through the projects", async ({ page }) => {
      await page.goto(`/${locale}/projects/book-diary`);
      await page.getByRole("link", { name: new RegExp(`^${c.prev}`) }).click();
      await page.waitForURL(`**/${locale}/projects/destino-china`);
      await page.getByRole("link", { name: new RegExp(`^${c.next}`) }).click();
      await page.waitForURL(`**/${locale}/projects/book-diary`);
      await page.getByRole("link", { name: new RegExp(`^${c.next}`) }).click();
      await page.waitForURL(`**/${locale}/projects/wod-tracker`);
    });
  });
}

test("unknown slug is a 404", async ({ page }) => {
  const response = await page.goto("/en/projects/nope");
  expect(response?.status()).toBe(404);
});

test("project cards on the home link to existing case studies", async ({ page }) => {
  await page.goto("/en");
  await page.locator("[data-project-card]").nth(1).getByRole("link", { name: /Case study/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("WOD Tracker");
});

test.describe("layout", () => {
  test("main media ratio, summary columns and stack grid", async ({ page }, testInfo) => {
    const mobile = testInfo.project.name === "mobile";
    await page.goto("/en/projects/wod-tracker");
    const article = page.locator("article");
    const mainMedia = article.locator("> div[aria-hidden='true']").first();
    const box = (await mainMedia.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(mobile ? 4 / 5 : 16 / 9, 1);

    const columns = await article.locator("#cs-stack ~ ul").evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    expect(columns).toBe(mobile ? 3 : 6);

    const title = await page.locator("#cs-problem").boundingBox();
    const body = await page.locator("#cs-problem + div").boundingBox();
    if (mobile) expect(body!.y).toBeGreaterThan(title!.y + title!.height - 1);
    else expect(body!.x).toBeGreaterThan(title!.x + title!.width - 1);
  });

  test("mobile screens strip scrolls horizontally on mobile", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/en/projects/wod-tracker");
    const list = page.getByRole("region", { name: "Mobile screens" }).locator("ul");
    expect(await list.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
  });

  test("page does not overflow horizontally", async ({ page }) => {
    await page.goto("/en/projects/destino-china");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});

test.describe("motion", () => {
  test("main media has no entrance animation; blocks reveal on scroll", async ({ page }) => {
    await page.goto("/en/projects/wod-tracker");
    await expect(page.locator("article > div[aria-hidden='true']").first()).not.toHaveClass(/reveal/);
    const block = page.locator("#cs-result").locator("xpath=ancestor::div[contains(@class,'reveal')]");
    await expect(block).toHaveAttribute("data-shown", "false");
    await page.locator("#cs-result").scrollIntoViewIfNeeded();
    await expect(block).toHaveAttribute("data-shown", "true");
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("blocks are visible without transition", async ({ page }) => {
      await page.goto("/en/projects/wod-tracker");
      const block = page.locator("#cs-result").locator("xpath=ancestor::div[contains(@class,'reveal')]");
      await expect(block).toHaveCSS("opacity", "1");
      await expect(block).toHaveCSS("transition-duration", "0s");
    });
  });
});

test.describe("screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  for (const locale of ["en", "es"] as const) {
    for (const scheme of ["light", "dark"] as const) {
      test.describe(`${locale} ${scheme}`, () => {
        test.use({ colorScheme: scheme });
        test(`case study ${locale} ${scheme}`, async ({ page }) => {
          await page.goto(`/${locale}/projects/destino-china`);
          await page.evaluate(() => document.fonts.ready);
          await expect(page).toHaveScreenshot(`case-study-${locale}-${scheme}.png`, { fullPage: true, animations: "disabled" });
        });
      });
    }
  }
});
