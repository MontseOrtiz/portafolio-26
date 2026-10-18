import { expect, test, type Page } from "@playwright/test";

const EMAIL = "montseortiz29@gmail.com";
const copy = {
  en: { label: "Contact", title: "Let's work together", copy: "Copy", copied: "Copied!", download: "Download PDF", view: "View CV", cta: "Let's talk" },
  es: { label: "Contacto", title: "Trabajemos juntos", copy: "Copiar", copied: "¡Copiado!", download: "Descargar PDF", view: "Ver CV", cta: "Hablemos" },
} as const;

const block = (page: Page) => page.locator("section#get-in-touch");

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

  test.describe(`contact ${locale}`, () => {
    test("label, title, invitation, email link, links and CV buttons", async ({ page }) => {
      await page.goto(`/${locale}`);
      const section = block(page);
      await expect(section.getByText(c.label, { exact: true })).toBeVisible();
      await expect(section.getByRole("heading", { level: 2, name: c.title })).toBeVisible();
      await expect(section.getByRole("link", { name: new RegExp(EMAIL) })).toHaveAttribute("href", `mailto:${EMAIL}`);
      await expect(section.getByRole("button", { name: /Copy|Copiar/ })).toBeVisible();

      for (const name of [/LinkedIn/, /GitHub/]) {
        const link = section.getByRole("link", { name });
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
      }
      await expect(section.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/montse-ortiz/");
      await expect(section.getByRole("link", { name: c.download })).toHaveAttribute("href", `/cv/montse-ortiz-cv-${locale}.pdf`);
      await expect(section.getByRole("link", { name: c.view })).toHaveAttribute("href", `/${locale}/about#cv`);
    });

    test("no form, phone number, map or scheduling", async ({ page }) => {
      await page.goto(`/${locale}`);
      const section = block(page);
      await expect(section.locator("form, input, textarea, iframe")).toHaveCount(0);
      expect(await section.innerText()).not.toMatch(/\+52|\d{4} ?\d{4}/);
    });

    test("the nav CTA lands on the closing footer (#contact), not on this block", async ({ page }, testInfo) => {
      await page.goto(`/${locale}`);
      if (testInfo.project.name === "mobile") await page.getByRole("button", { name: /menu|menú/i }).click();
      await page.getByRole("banner").getByRole("link", { name: c.cta }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}#contact$`));
      await expect(page.locator("footer#contact")).toBeInViewport();
    });
  });
}

test.describe("copy button", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test("copies the email, shows Copied! for 2 s and announces it politely", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are chromium-only");
    await page.goto("/en");
    const section = block(page);
    await section.scrollIntoViewIfNeeded();
    const button = section.getByRole("button", { name: "Copy email address" });
    await button.click();
    await expect(button).toHaveText("Copied!");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(EMAIL);
    const live = section.locator("[aria-live='polite']");
    await expect(live).toHaveText("Copied!");
    // Vuelve a "Copy" tras ~2 s.
    await expect(button).toHaveText("Copy", { timeout: 4000 });
    await expect(live).toHaveText("");
  });
});

test.describe("color and hover", () => {
  for (const scheme of ["light", "dark"] as const) {
    test.describe(scheme, () => {
      test.use({ colorScheme: scheme });

      test("accent background with on-accent text; primary button inverts on hover", async ({ page }, testInfo) => {
        await page.goto("/en");
        const section = block(page);
        await section.scrollIntoViewIfNeeded();
        const card = section.locator(".reveal");
        await expect(card).toHaveCSS("background-color", await tokenColor(page, "accent"));
        await expect(card).toHaveCSS("color", await tokenColor(page, "on-accent"));

        const primary = section.getByRole("link", { name: "Download PDF" });
        await expect(primary).toHaveCSS("background-color", await tokenColor(page, "on-accent"));
        await expect(primary).toHaveCSS("color", await tokenColor(page, "accent"));
        if (testInfo.project.name === "desktop") {
          await primary.hover();
          await expect.poll(() => primary.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
          await expect(primary).toHaveCSS("color", await tokenColor(page, "on-accent"));
        }
      });
    });
  }
});

test.describe("layout", () => {
  test("desktop: email on its own row; links left, CV buttons right", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.goto("/en");
    const section = block(page);
    const email = (await section.getByRole("link", { name: new RegExp(EMAIL) }).boundingBox())!;
    const links = (await section.getByRole("list", { name: "Links" }).boundingBox())!;
    const download = (await section.getByRole("link", { name: "Download PDF" }).boundingBox())!;
    const view = (await section.getByRole("link", { name: "View CV" }).boundingBox())!;
    expect(links.y).toBeGreaterThan(email.y + email.height);
    expect(Math.abs(links.y + links.height / 2 - (download.y + download.height / 2))).toBeLessThan(8);
    expect(download.x).toBeGreaterThan(links.x + links.width);
    expect(view.x).toBeGreaterThan(download.x);
  });

  test("mobile: stacked, the email wraps without overflow, CV buttons full width", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/en");
    const section = block(page);
    await section.scrollIntoViewIfNeeded();
    const card = (await section.locator(".reveal").boundingBox())!;
    const download = (await section.getByRole("link", { name: "Download PDF" }).boundingBox())!;
    const view = (await section.getByRole("link", { name: "View CV" }).boundingBox())!;
    // Ancho de la tarjeta menos su padding horizontal (gutter × 2).
    expect(Math.abs(download.width - (card.width - 40))).toBeLessThan(2);
    expect(Math.abs(view.width - download.width)).toBeLessThan(2);
    expect(view.y).toBeGreaterThan(download.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const emailBox = (await section.getByRole("link", { name: new RegExp(EMAIL) }).boundingBox())!;
    expect(emailBox.x + emailBox.width).toBeLessThanOrEqual(card.x + card.width);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("the block is visible without a transition", async ({ page }) => {
    await page.goto("/en");
    const card = block(page).locator(".reveal");
    await expect(card).toHaveCSS("opacity", "1");
    await expect(card).toHaveCSS("transition-duration", "0s");
  });
});

test.describe("screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  for (const locale of ["en", "es"] as const) {
    for (const scheme of ["light", "dark"] as const) {
      test.describe(`${locale} ${scheme}`, () => {
        test.use({ colorScheme: scheme });
        test(`contact ${locale} ${scheme}`, async ({ page }) => {
          await page.goto(`/${locale}`);
          await page.evaluate(() => document.fonts.ready);
          await block(page).scrollIntoViewIfNeeded();
          await expect(block(page)).toHaveScreenshot(`contact-${locale}-${scheme}.png`, { animations: "disabled", mask: [page.getByRole("banner")] });
        });
      });
    }
  }
});
