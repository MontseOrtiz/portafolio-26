import { expect, test, type Page } from "@playwright/test";

const EMAIL = "montseortiz29@gmail.com";
const copy = {
  en: { home: "Let's work together", about: "Selected work", cta: "Let's talk", credit: /Made with .* in Querétaro/, love: "love" },
  es: { home: "Trabajemos juntos", about: "Proyectos", cta: "Hablemos", credit: /Hecho con .* en Querétaro/, love: "amor" },
} as const;

const footer = (page: Page) => page.locator("footer#contact");

const tokenColor = (page: Page, token: string) =>
  page.evaluate((name) => {
    const el = document.createElement("span");
    el.style.color = `var(--token-${name})`;
    document.body.append(el);
    const color = getComputedStyle(el).color;
    el.remove();
    return color;
  }, token);

for (const locale of ["en", "es"] as const) {
  const c = copy[locale];

  test.describe(`footer ${locale}`, () => {
    test("home: phrase is a mailto link, awning on top", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(footer(page).getByRole("heading", { level: 2 }).getByRole("link", { name: c.home })).toHaveAttribute("href", `mailto:${EMAIL}`);
      await expect(footer(page).locator(".pattern-awning")).toHaveAttribute("aria-hidden", "true");
    });

    test("about: phrase links to /#work, no awning", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      const phrase = footer(page).getByRole("heading", { level: 2 }).getByRole("link");
      await expect(phrase).toContainText(c.about);
      await expect(phrase).toHaveAttribute("href", `/${locale}#work`);
      await expect(footer(page).locator(".pattern-awning")).toHaveCount(0);
    });

    test("case study: no phrase, only the links row, after Previous / Next", async ({ page }) => {
      await page.goto(`/${locale}/projects/wod-tracker`);
      await expect(footer(page).getByRole("heading")).toHaveCount(0);
      await expect(footer(page).locator(".pattern-awning")).toHaveCount(0);
      const next = (await page.getByRole("link", { name: locale === "en" ? /^Next/ : /^Siguiente/ }).boundingBox())!;
      const box = (await footer(page).boundingBox())!;
      expect(box.y).toBeGreaterThan(next.y + next.height);
    });

    for (const path of ["", "/about", "/projects/book-diary"]) {
      test(`links row and credit on ${path || "home"}`, async ({ page }) => {
        await page.goto(`/${locale}${path}`);
        const links = footer(page).getByRole("navigation");
        const linkedin = links.getByRole("link", { name: /LinkedIn/ });
        await expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/montse-ortiz/");
        await expect(linkedin).toHaveAttribute("target", "_blank");
        await expect(linkedin).toHaveAttribute("rel", /noopener/);
        await expect(links.getByRole("link", { name: /GitHub/ })).toHaveAttribute("target", "_blank");
        await expect(links.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);

        // Año automático y corazón decorativo con texto accesible.
        await expect(footer(page)).toContainText(`© ${new Date().getFullYear()} Montse Ortiz`);
        const credit = footer(page).getByText(c.credit);
        await expect(credit).toBeVisible();
        const heart = credit.locator("[aria-hidden='true']");
        await expect(heart).toHaveText("♥");
        await expect(heart).toHaveCSS("color", await tokenColor(page, "cherry"));
        await expect(credit.locator(".sr-only", { hasText: c.love })).toHaveCount(1);
      });
    }

    test("the nav CTA lands on the footer on every page", async ({ page }, testInfo) => {
      for (const path of ["", "/about", "/projects/destino-china"]) {
        await page.goto(`/${locale}${path}`);
        if (testInfo.project.name === "mobile") await page.getByRole("button", { name: /menu|menú/i }).click();
        await page.getByRole("banner").getByRole("link", { name: c.cta }).click();
        await expect(page).toHaveURL(new RegExp(`#contact$`));
        await expect(footer(page)).toBeInViewport();
      }
    });
  });
}

test("no form, phone number, newsletter, sitemap or Instagram", async ({ page }) => {
  await page.goto("/en");
  const f = footer(page);
  await expect(f.locator("form, input, textarea")).toHaveCount(0);
  const text = await f.innerText();
  expect(text).not.toMatch(/\+52|newsletter|instagram/i);
  await expect(f.getByRole("link", { name: /instagram/i })).toHaveCount(0);
});

test.describe("layout and color", () => {
  test("surface background, radius-md, 1px divider; phrase uses display-xl and is bottom-left", async ({ page }, testInfo) => {
    await page.goto("/en");
    const f = footer(page);
    await f.scrollIntoViewIfNeeded();
    await expect(f).toHaveCSS("background-color", await tokenColor(page, "surface"));
    await expect(f).toHaveCSS("border-top-left-radius", "16px");
    await expect(f.getByRole("navigation")).toHaveCSS("border-top-width", "1px");
    const phrase = f.getByRole("heading", { level: 2 }).getByRole("link");
    await expect(phrase).toHaveCSS("font-weight", "500");
    const box = (await f.boundingBox())!;
    const text = (await phrase.boundingBox())!;
    // gutter: 32px en escritorio, 20px en móvil.
    expect(Math.abs(text.x - box.x - (testInfo.project.name === "mobile" ? 20 : 32))).toBeLessThan(4);
  });

  test("desktop: LinkedIn left, email centre, GitHub right in one row", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.goto("/en");
    const links = footer(page).getByRole("navigation");
    const [l, e, g] = await Promise.all(
      [/LinkedIn/, new RegExp(EMAIL), /GitHub/].map(async (name) => (await links.getByRole("link", { name }).boundingBox())!),
    );
    expect(l.x).toBeLessThan(e.x);
    expect(e.x).toBeLessThan(g.x);
    expect(Math.abs(l.y - g.y)).toBeLessThan(4);
    const nav = (await links.boundingBox())!;
    expect(Math.abs(e.x + e.width / 2 - (nav.x + nav.width / 2))).toBeLessThan(40);
    expect(g.x + g.width).toBeGreaterThan(nav.x + nav.width - 40);
  });

  test("mobile: phrase on two lines and links stacked on the left", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/en");
    const f = footer(page);
    await f.scrollIntoViewIfNeeded();
    const phrase = f.getByRole("heading", { level: 2 }).getByRole("link");
    const lines = await phrase.evaluate((el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
    expect(lines).toBe(2);
    const links = f.getByRole("navigation");
    const [l, e, g] = await Promise.all(
      [/LinkedIn/, new RegExp(EMAIL), /GitHub/].map(async (name) => (await links.getByRole("link", { name }).boundingBox())!),
    );
    expect(e.y).toBeGreaterThan(l.y);
    expect(g.y).toBeGreaterThan(e.y);
    expect(Math.abs(l.x - e.x)).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test("hover turns the phrase and the links pop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "hover needs a pointer");
    await page.goto("/en");
    const f = footer(page);
    await f.scrollIntoViewIfNeeded();
    const pop = await tokenColor(page, "pop");
    const phrase = f.getByRole("heading", { level: 2 }).getByRole("link");
    await phrase.hover();
    await expect.poll(() => phrase.evaluate((el) => getComputedStyle(el).color)).toBe(pop);
    const github = f.getByRole("link", { name: /GitHub/ });
    await github.hover();
    await expect.poll(() => github.evaluate((el) => getComputedStyle(el).color)).toBe(pop);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("the phrase is visible without a transition", async ({ page }) => {
    await page.goto("/en");
    const reveal = footer(page).locator(".reveal");
    await expect(reveal).toHaveCSS("opacity", "1");
    await expect(reveal).toHaveCSS("transition-duration", "0s");
  });
});

test("the phrase reveals once when it enters the viewport", async ({ page }) => {
  await page.goto("/en");
  const reveal = footer(page).locator(".reveal");
  await expect(reveal).toHaveAttribute("data-shown", "false");
  await footer(page).scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute("data-shown", "true");
});

test("print hides the footer", async ({ page }) => {
  await page.goto("/en/about");
  await page.emulateMedia({ media: "print" });
  await expect(footer(page)).toBeHidden();
});

test.describe("screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  const shots = [
    { name: "home", path: "", locales: ["en", "es"] },
    { name: "about", path: "/about", locales: ["en"] },
    { name: "case-study", path: "/projects/wod-tracker", locales: ["en"] },
  ] as const;
  for (const shot of shots) {
    for (const locale of shot.locales) {
      for (const scheme of ["light", "dark"] as const) {
        test.describe(`${shot.name} ${locale} ${scheme}`, () => {
          test.use({ colorScheme: scheme });
          test(`footer ${shot.name} ${locale} ${scheme}`, async ({ page }) => {
            await page.goto(`/${locale}${shot.path}`);
            await page.evaluate(() => document.fonts.ready);
            await footer(page).scrollIntoViewIfNeeded();
            await expect(footer(page)).toHaveScreenshot(`footer-${shot.name}-${locale}-${scheme}.png`, {
              animations: "disabled",
              mask: [page.getByRole("banner")],
            });
          });
        });
      }
    }
  }
});
