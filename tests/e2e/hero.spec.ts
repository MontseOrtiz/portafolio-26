import { expect, test, type Page } from "@playwright/test";

const LOCALES = ["en", "es"] as const;
const SCHEMES = ["light", "dark"] as const;

const copy = {
  en: { seeProjects: "See projects", contact: "Contact", imageAlt: "Illustration of Montse coding on her laptop, sitting on a browser window with two dogs" },
  es: { seeProjects: "Ver proyectos", contact: "Contacto", imageAlt: "Ilustración de Montse programando en su laptop, sentada sobre una ventana de navegador con dos perritos" },
} as const;

async function ready(page: Page) {
  await page.evaluate(() => document.fonts.ready);
}

for (const locale of LOCALES) {
  for (const scheme of SCHEMES) {
    test.describe(`hero ${locale} ${scheme}`, () => {
      test.use({ colorScheme: scheme });

      test(`screenshot ${locale} ${scheme}`, async ({ page }) => {
        await page.goto(`/${locale}`);
        await ready(page);
        // Recorte de la página completa con la caja del hero. El nav fijo queda arriba de
        // ese recorte, así que no aparece; un screenshot de elemento sí lo incluía.
        const box = await page.locator("#hero").boundingBox();
        expect(box).not.toBeNull();
        const image = await page.screenshot({
          fullPage: true,
          animations: "disabled",
          clip: box!,
        });
        // Misma tolerancia que toHaveScreenshot en playwright.config.ts.
        expect(image).toMatchSnapshot(`hero-${locale}-${scheme}.png`, { maxDiffPixelRatio: 0.02 });
      });
    });
  }
}

test.describe("hero content and links", () => {
  for (const locale of LOCALES) {
    test(`name is the only h1 and image has its alt (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Montse Ortiz");
      await expect(page.locator("#hero img")).toHaveAttribute("alt", copy[locale].imageAlt);
    });

    test(`buttons point to #projects and #contact (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}`);

      // Acotado al hero: el nav también tiene un link "Contact".
      const hero = page.locator("#hero");
      const projects = hero.getByRole("link", { name: copy[locale].seeProjects });
      await expect(projects).toHaveAttribute("href", `/${locale}#projects`);

      const contact = hero.getByRole("link", { name: copy[locale].contact });
      await expect(contact).toHaveAttribute("href", `/${locale}#contact`);

      await projects.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}#projects$`));
      await expect(page.locator("#projects")).toBeAttached();

      await page.goto(`/${locale}`);
      await contact.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}#contact$`));
      await expect(page.locator("#contact")).toBeAttached();
    });
  }
});

test("hero does not overflow horizontally", async ({ page }) => {
  await page.goto("/en");
  await ready(page);
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflows).toBe(false);
});

test.describe("hero motion", () => {
  test("name is visible on load and only its opacity animates", async ({ page }) => {
    await page.goto("/en");
    const name = page.getByRole("heading", { level: 1 });
    await expect(name).toBeVisible();

    const animation = await name.evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe("hero-fade");

    await expect
      .poll(() => name.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("no animations; everything is in its final state", async ({ page }) => {
      await page.goto("/en");
      const name = page.getByRole("heading", { level: 1 });
      await expect(name).toBeVisible();

      const { animation, opacity } = await name.evaluate((el) => ({
        animation: getComputedStyle(el).animationName,
        opacity: getComputedStyle(el).opacity,
      }));
      expect(animation).toBe("none");
      expect(opacity).toBe("1");

      const image = page.locator("#hero img");
      const imageAnimation = await image.evaluate((el) => getComputedStyle(el).animationName);
      expect(imageAnimation).toBe("none");
    });
  });
});
