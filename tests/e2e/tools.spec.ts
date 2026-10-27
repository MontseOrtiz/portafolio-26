import { expect, test, type Page } from "@playwright/test";

const copy = {
  en: { title: "Tools I build with", list: "Tools" },
  es: { title: "Herramientas con las que construyo", list: "Herramientas" },
} as const;

const NAMES = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "Tailwind CSS", "Supabase", "PostgreSQL",
  "MongoDB", "MySQL", "Docker", "Jest", "Playwright", "Git", "GitHub", "Vercel", "WordPress", "Claude Code",
];

const cards = (page: Page) => page.locator("#tools .tool-card");

for (const locale of ["en", "es"] as const) {
  test.describe(`tools ${locale}`, () => {
    test("heading, labelled list with the 19 tools, awning strip", async ({ page }) => {
      await page.goto(`/${locale}`);
      const section = page.locator("section#tools");
      await expect(section.getByRole("heading", { level: 2, name: copy[locale].title })).toBeAttached();
      const list = section.getByRole("list", { name: copy[locale].list, exact: true });
      await expect(list.getByRole("listitem")).toHaveCount(19);
      for (const name of NAMES) await expect(list.getByText(name, { exact: true })).toHaveCount(1);
      // Íconos decorativos; el nombre es texto real.
      expect(await section.locator("svg:not([aria-hidden='true'])").count()).toBe(0);
      // Franja de ondas arriba y espejada abajo, ambas decorativas.
      const awnings = section.locator(".pattern-awning");
      await expect(awnings).toHaveCount(2);
      for (const awning of await awnings.all()) await expect(awning).toHaveAttribute("aria-hidden", "true");
    });
  });
}

test.describe("awning, phrase color", () => {
  for (const scheme of ["light", "dark"] as const) {
    test.describe(scheme, () => {
      test.use({ colorScheme: scheme });

      test("awning is pop on top and mirrored at the bottom; phrase is cherry", async ({ page }) => {
        await page.goto("/en");
        const { pop, cherry } = await page.evaluate(() => {
          const probe = (token: string) => {
            const el = document.createElement("span");
            el.style.color = `var(--token-${token})`;
            document.body.append(el);
            const color = getComputedStyle(el).color;
            el.remove();
            return color;
          };
          return { pop: probe("pop"), cherry: probe("cherry") };
        });
        const awnings = page.locator("#tools .pattern-awning");
        for (const awning of await awnings.all()) {
          expect(await awning.evaluate((el) => getComputedStyle(el).backgroundImage)).toContain(pop);
        }
        expect(await awnings.nth(0).evaluate((el) => getComputedStyle(el).transform)).toBe("none");
        expect(await awnings.nth(1).evaluate((el) => getComputedStyle(el).transform)).toBe("matrix(1, 0, 0, -1, 0, 0)");

        // El bloque inferior es el último hijo de la sección, debajo del contenido.
        const section = (await page.locator("#tools").boundingBox())!;
        const bottom = (await awnings.nth(1).boundingBox())!;
        expect(Math.round(bottom.y + bottom.height)).toBeGreaterThanOrEqual(Math.round(section.y + section.height) - 2);

        await expect(page.locator("#tools h2")).toHaveCSS("color", cherry);
        await expect(page.locator("#tools h2 + p")).toHaveCSS("color", cherry);
      });
    });
  }
});

test("cards alternate surface, powder and accent-soft backgrounds", async ({ page }) => {
  await page.goto("/en");
  const backgrounds = await cards(page).evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
  expect(new Set(backgrounds).size).toBe(3);
});

test.describe("desktop", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "floating layout is desktop only");
  });

  test("three card sizes (96/128/160), none overlapping each other or the phrase", async ({ page }) => {
    await page.goto("/en");
    await page.locator("#tools").scrollIntoViewIfNeeded();
    const boxes = await cards(page).evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        const box = el as HTMLElement;
        return { x: r.x, y: r.y, w: box.offsetWidth, h: box.offsetHeight };
      }),
    );
    const sizes = boxes.map((b) => b.w).sort((a, b) => a - b);
    expect(sizes.filter((s) => s === 96)).toHaveLength(7);
    expect(sizes.filter((s) => s === 128)).toHaveLength(7);
    expect(sizes.filter((s) => s === 160)).toHaveLength(5);

    // Los li no llevan transform (el tilt va en la tarjeta interna), así que su caja es la posición real.
    const layout = await page.locator("#tools li").evaluateAll((els) => els.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    }));
    const phrase = await page.locator("#tools h2").evaluate((el) => {
      const r = el.parentElement!.parentElement!.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    });
    const hit = (a: typeof phrase, b: typeof phrase) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    for (let i = 0; i < layout.length; i++) {
      expect(hit(layout[i], phrase), `card ${i} overlaps the phrase`).toBe(false);
      for (let j = i + 1; j < layout.length; j++) expect(hit(layout[i], layout[j]), `cards ${i} and ${j} overlap`).toBe(false);
    }
  });

  test("tilt-3d with perspective and different combinations; hover straightens and scales", async ({ page }) => {
    await page.goto("/en");
    const first = cards(page).first();
    await first.scrollIntoViewIfNeeded();
    const transforms = await cards(page).evaluateAll((els) => els.map((el) => getComputedStyle(el).transform));
    expect(transforms.every((t) => t !== "none")).toBe(true);
    expect(new Set(transforms).size).toBeGreaterThanOrEqual(4);

    await page.locator("#tools .reveal[data-shown='true']").first().waitFor();
    await first.hover();
    await expect.poll(() => first.evaluate((el) => getComputedStyle(el).scale)).toBe("1.02");
    await expect
      .poll(() => first.evaluate((el) => getComputedStyle(el).transform))
      .toMatch(/^matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, (-?[\d.e-]+), 0, 0, 0, 1\)$|^matrix\(1, 0, 0, 1, 0, 0\)$/);
  });

  test("names are visible on desktop", async ({ page }) => {
    await page.goto("/en");
    const box = (await page.locator("#tools li").first().locator("span").boundingBox())!;
    expect(box.width).toBeGreaterThan(20);
  });

  test("the phrase sits in the middle of the block", async ({ page }) => {
    await page.goto("/en");
    const section = (await page.locator("#tools").boundingBox())!;
    const heading = (await page.locator("#tools h2").boundingBox())!;
    expect(Math.abs(heading.x + heading.width / 2 - (section.x + section.width / 2))).toBeLessThan(4);
    expect(heading.width).toBeLessThanOrEqual(560);
  });
});

test.describe("mobile", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "bento grid is mobile only");
  });

  test("3-column bento with uneven heights, phrase spanning 2 columns, no tilt, no overflow", async ({ page }) => {
    await page.goto("/en");
    await page.locator("#tools").scrollIntoViewIfNeeded();
    const grid = page.locator("#tools .grid");
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    expect(columns).toBe(3);

    const heights = new Set(await page.locator("#tools li").evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height))));
    expect(heights.size).toBeGreaterThanOrEqual(2);

    const col = (await page.locator("#tools li").first().boundingBox())!.width;
    const phraseBox = await page.locator("#tools h2").evaluate((el) => el.parentElement!.parentElement!.getBoundingClientRect().width);
    expect(phraseBox).toBeGreaterThan(col * 1.8);

    expect(await cards(page).first().evaluate((el) => getComputedStyle(el).transform)).toBe("none");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test("only icons are visible; names stay available to screen readers", async ({ page }) => {
    await page.goto("/en");
    const name = page.locator("#tools li").first().locator("span");
    const box = (await name.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(1);
    expect(box.height).toBeLessThanOrEqual(1);
    await expect(page.getByRole("list", { name: "Tools" }).getByText("React", { exact: true })).toHaveCount(1);
    await expect(page.locator("#tools li").first().locator("svg")).toBeVisible();
  });

  test("the phrase is between the cards, not first or last", async ({ page }) => {
    await page.goto("/en");
    const before = await page.locator("#tools li").nth(0).evaluate((el) => el.getBoundingClientRect().top);
    const phrase = await page.locator("#tools h2").evaluate((el) => el.getBoundingClientRect().top);
    const after = await page.locator("#tools li").nth(18).evaluate((el) => el.getBoundingClientRect().top);
    expect(phrase).toBeGreaterThan(before);
    expect(phrase).toBeLessThan(after);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("cards are visible and do not rotate or scale on hover", async ({ page }, testInfo) => {
    await page.goto("/en");
    const first = cards(page).first();
    await first.scrollIntoViewIfNeeded();
    await expect(page.locator("#tools .reveal").first()).toHaveCSS("opacity", "1");
    const before = await first.evaluate((el) => getComputedStyle(el).transform);
    if (testInfo.project.name === "desktop") await first.hover();
    expect(await first.evaluate((el) => getComputedStyle(el).scale)).toBe("none");
    expect(await first.evaluate((el) => getComputedStyle(el).transform)).toBe(before);
  });
});

test.describe("screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  for (const locale of ["en", "es"] as const) {
    for (const scheme of ["light", "dark"] as const) {
      test.describe(`${locale} ${scheme}`, () => {
        test.use({ colorScheme: scheme });
        test(`tools ${locale} ${scheme}`, async ({ page }) => {
          await page.goto(`/${locale}`);
          await page.evaluate(() => document.fonts.ready);
          const section = page.locator("#tools");
          await section.scrollIntoViewIfNeeded();
          // El nav fijo cae sobre la sección según el scroll: se oculta (en vez de enmascararlo) para que la captura no dependa de dónde quede.
          await page.addStyleTag({ content: "header { visibility: hidden !important; }" });
          await expect(section).toHaveScreenshot(`tools-${locale}-${scheme}.png`, { animations: "disabled" });
        });
      });
    }
  }
});
