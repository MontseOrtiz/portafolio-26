import { expect, test, type Page } from "@playwright/test";

const LOCALES = ["en", "es"] as const;
const SCHEMES = ["light", "dark"] as const;

const copy = {
  en: { seeProjects: "See projects", contact: "Contact", imageAlt: "Illustration of Montse coding on her laptop, sitting on a browser window with two dogs" },
  es: { seeProjects: "Ver proyectos", contact: "Contacto", imageAlt: "Ilustración de Montse programando en su laptop, sentada sobre una ventana de navegador con dos perritos" },
} as const;

// Espera fuentes y animaciones de entrada (nav, hero) antes de capturar.
async function ready(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
  });
  // El nombre lo anima Motion (JS): esperar a que llegue a su posición final.
  await page.waitForFunction(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return false;
    const { opacity, transform } = getComputedStyle(h1);
    return opacity === "1" && (transform === "none" || transform.startsWith("matrix(1, 0, 0, 1, 0, 0)"));
  });
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

    test(`buttons point to #work and #contact (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}`);

      // Acotado al hero: el nav también tiene un link "Contact".
      const hero = page.locator("#hero");
      const projects = hero.getByRole("link", { name: copy[locale].seeProjects });
      await expect(projects).toHaveAttribute("href", `/${locale}#work`);

      const contact = hero.getByRole("link", { name: copy[locale].contact });
      await expect(contact).toHaveAttribute("href", `/${locale}#contact`);

      await projects.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}#work$`));
      await expect(page.locator("#work")).toBeAttached();

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
  test("name rises from 150px with a spring: starts low and transparent, ends in place", async ({ page }) => {
    await page.goto("/en");
    const name = page.getByRole("heading", { level: 1 });
    await expect(name).toBeVisible();

    // Muestrea cada frame durante la intro: tiene que haber un momento con el nombre
    // desplazado y casi transparente, y al final quedar en su sitio con opacidad 1.
    const samples = await page.evaluate(
      () =>
        new Promise<{ y: number; opacity: number }[]>((resolve) => {
          const h1 = document.querySelector("h1")!;
          const out: { y: number; opacity: number }[] = [];
          const start = performance.now();
          const tick = () => {
            const m = new DOMMatrixReadOnly(getComputedStyle(h1).transform === "none" ? undefined : getComputedStyle(h1).transform);
            out.push({ y: m.m42, opacity: Number(getComputedStyle(h1).opacity) });
            if (performance.now() - start < 2500) requestAnimationFrame(tick);
            else resolve(out);
          };
          tick();
        }),
    );
    expect(samples.some((f) => f.y > 100 && f.opacity < 0.5)).toBe(true);
    const last = samples[samples.length - 1];
    expect(last.y).toBeCloseTo(0, 1);
    expect(last.opacity).toBe(1);
  });

  test("image and text rows reveal after the intro delay, not before", async ({ page }) => {
    await page.goto("/en");
    const row = page.locator("#hero .hero-rise").last();
    const delay = await row.evaluate((el) => getComputedStyle(el).animationDelay);
    expect(delay).toBe("0.7s");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("no movement: everything is in its final state", async ({ page }) => {
      await page.goto("/en");
      const name = page.getByRole("heading", { level: 1 });
      await expect(name).toBeVisible();
      await expect.poll(() => name.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
      const transform = await name.evaluate((el) => getComputedStyle(el).transform);
      expect(transform === "none" || transform.startsWith("matrix(1, 0, 0, 1, 0, 0)")).toBe(true);

      for (const selector of ["#hero img", "#hero .hero-rise", "header"]) {
        const animation = await page.locator(selector).last().evaluate((el) => getComputedStyle(el).animationName);
        expect(animation, selector).toBe("none");
      }
    });
  });
});
