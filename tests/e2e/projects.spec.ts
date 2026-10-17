import { expect, test } from "@playwright/test";

const LOCALES = ["en", "es"] as const;
const copy = {
  en: { title: "Projects", prev: "Previous project", next: "Next project", concept: "Concept project", demo: "Live demo", study: "Case study" },
  es: { title: "Proyectos", prev: "Proyecto anterior", next: "Proyecto siguiente", concept: "Proyecto conceptual", demo: "Demo en vivo", study: "Caso de estudio" },
} as const;

for (const locale of LOCALES) {
  const c = copy[locale];

  test.describe(`projects ${locale}`, () => {
    test("section is #work with heading and a list of three cards", async ({ page }) => {
      await page.goto(`/${locale}`);
      const section = page.locator("section#work");
      await expect(section.getByRole("heading", { level: 2, name: c.title })).toBeVisible();
      const list = section.getByRole("list", { name: c.title, exact: true });
      await expect(list.locator("[data-project-card]")).toHaveCount(3);
      await expect(section.getByText("1 / 3")).toBeVisible();
    });

    test("cards link to the case study and open the demo in a new tab", async ({ page }) => {
      await page.goto(`/${locale}`);
      const cards = page.locator("[data-project-card]");
      await expect(cards.nth(1).getByRole("link", { name: new RegExp(c.study) })).toHaveAttribute(
        "href",
        `/${locale}/projects/wod-tracker`,
      );
      const demo = cards.nth(1).getByRole("link", { name: new RegExp(c.demo) });
      await expect(demo).toHaveAttribute("target", "_blank");
      await expect(demo).toHaveAttribute("rel", /noopener/);
      await expect(demo).toHaveAttribute("href", "https://wod-tracker-iota.vercel.app/");
    });

    test("only Destino China has the concept badge; there are exactly 3 cards, no filters", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByText(c.concept)).toHaveCount(1);
      await expect(page.locator("[data-project-card]").nth(2).getByText(c.concept)).toBeVisible();
    });

    test("Tab reaches a card link and scrolls the strip to show it", async ({ page }) => {
      await page.goto(`/${locale}`);
      const last = page.locator("[data-project-card]").nth(2).getByRole("link", { name: new RegExp(c.study) });
      await last.focus();
      await expect(last).toBeInViewport();
    });
  });
}

test.describe("desktop strip", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "arrows and staggered layout are desktop only");
  });

  test("card widths 480/360/420 and offsets 0/48/24", async ({ page }) => {
    await page.goto("/en");
    const cards = page.locator("[data-project-card]");
    const boxes = await cards.evaluateAll((els) => els.map((el) => el.getBoundingClientRect()));
    expect(boxes.map((b) => Math.round(b.width))).toEqual([480, 360, 420]);
    const top = Math.round(boxes[0].top);
    expect(boxes.map((b) => Math.round(b.top - top) || 0)).toEqual([0, 48, 24]);
  });

  test("first card fully visible and second peeking; arrows move the counter", async ({ page }) => {
    await page.goto("/en");
    const cards = page.locator("[data-project-card]");
    await page.locator("section#work").scrollIntoViewIfNeeded();
    await expect(cards.first()).toBeInViewport({ ratio: 1 });
    await expect(cards.nth(1)).toBeInViewport();
    await expect(page.getByRole("button", { name: "Previous project" })).toBeDisabled();
    await page.getByRole("button", { name: "Next project" }).click();
    await expect(page.getByText("2 / 3")).toBeVisible();
    await page.getByRole("button", { name: "Next project" }).click();
    await expect(page.getByText("3 / 3")).toBeVisible();
    await expect(page.getByRole("button", { name: "Next project" })).toBeDisabled();
  });

  test("hover scales the mockup and turns the name pop", async ({ page }) => {
    await page.goto("/en");
    const card = page.locator("[data-project-card]").first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    const mock = card.locator('div[aria-hidden="true"]').first();
    await expect.poll(() => mock.evaluate((el) => getComputedStyle(el).scale)).toBe("1.02");
    // El nombre cambia al color pop (se compara contra un elemento de prueba con --token-pop).
    const name = card.getByRole("heading", { level: 3 });
    const popColor = await page.evaluate(() => {
      const probe = document.createElement("span");
      probe.style.color = "var(--token-pop)";
      document.body.append(probe);
      const color = getComputedStyle(probe).color;
      probe.remove();
      return color;
    });
    await expect.poll(() => name.evaluate((el) => getComputedStyle(el).color)).toBe(popColor);
  });
});

test.describe("mobile strip", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
  });

  test("cards are ~85% wide, not staggered, arrows hidden, counter visible", async ({ page }) => {
    await page.goto("/en");
    const cards = page.locator("[data-project-card]");
    const list = page.getByRole("list", { name: "Projects", exact: true });
    const [listBox, boxes] = [await list.boundingBox(), await cards.evaluateAll((els) => els.map((el) => el.getBoundingClientRect()))];
    expect(Math.round(boxes[0].width / listBox!.width * 100)).toBe(85);
    expect(new Set(boxes.map((b) => Math.round(b.top))).size).toBe(1);
    await expect(page.getByRole("button", { name: "Next project" })).toBeHidden();
    await expect(page.getByText("1 / 3")).toBeVisible();
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("cards are visible with no reveal transition", async ({ page }) => {
    await page.goto("/en");
    const reveal = page.locator("[data-project-card] .reveal").first();
    await expect(reveal).toHaveCSS("opacity", "1");
    await expect(reveal).toHaveCSS("transition-duration", "0s");
  });
});

test.describe("screenshots", () => {
  for (const locale of LOCALES) {
    for (const scheme of ["light", "dark"] as const) {
      test.describe(`${locale} ${scheme}`, () => {
        test.use({ colorScheme: scheme });
        test(`projects ${locale} ${scheme}`, async ({ page }) => {
          await page.goto(`/${locale}`);
          const section = page.locator("section#work");
          await section.scrollIntoViewIfNeeded();
          // La tercera tarjeta está fuera de la tira: se desplaza para que se revele y se regresa al inicio.
          const list = section.getByRole("list", { name: locale === "en" ? "Projects" : "Proyectos", exact: true });
          for (const i of [1, 2]) await page.locator("[data-project-card]").nth(i).scrollIntoViewIfNeeded();
          await expect(page.locator("[data-project-card] .reveal[data-shown='true']")).toHaveCount(3);
          await list.evaluate((el) => el.scrollTo({ left: 0, behavior: "instant" }));
          await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
          await expect(section).toHaveScreenshot(`projects-${locale}-${scheme}.png`, { animations: "disabled" });
        });
      });
    }
  }
});
