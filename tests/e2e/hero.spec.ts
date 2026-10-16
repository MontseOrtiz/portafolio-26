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

// Orden de la intro con la red lenta: nav y nombre primero, imagen después.
// Muestrea cada frame desde antes de cargar la página: guarda el primer instante en que
// cada elemento tiene opacidad visible.
test.describe("hero motion", () => {
  test("name rises from 150px and fades in, ending in place", async ({ page }) => {
    // Muestrea desde antes del primer render: si no, la carga puede llegar con la intro ya avanzada.
    await page.addInitScript(() => {
      const samples: { y: number; opacity: number }[] = [];
      (window as unknown as { __samples: typeof samples }).__samples = samples;
      const start = performance.now();
      const tick = () => {
        const h1 = document.querySelector("h1");
        if (h1) {
          const translate = getComputedStyle(h1).translate;
          const y = translate === "none" ? 0 : parseFloat(translate.split(" ")[1] ?? "0");
          samples.push({ y, opacity: Number(getComputedStyle(h1).opacity) });
        }
        if (performance.now() - start < 3000) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.waitForTimeout(2000);

    const samples = await page.evaluate(() => (window as unknown as { __samples: { y: number; opacity: number }[] }).__samples);
    expect(samples.some((f) => f.y > 100 && f.opacity < 0.5)).toBe(true);
    const last = samples[samples.length - 1];
    expect(Math.abs(last.y)).toBeLessThan(0.5);
    expect(last.opacity).toBe(1);
  });

  test("image, role and proposal wait for the intro delay (700ms and 900ms)", async ({ page }) => {
    await page.goto("/en");
    const image = await page.locator("#hero img").evaluate((el) => getComputedStyle(el).animationDelay);
    const text = await page.locator("#hero .intro-reveal-text").first().evaluate((el) => getComputedStyle(el).animationDelay);
    expect(image).toBe("0.7s");
    expect(text).toBe("0.9s");
  });

  test("entrance order holds on a slow connection: nav and name first, image after", async ({ page, context }) => {
    // Perfil equivalente a Slow 4G de DevTools: 400 ms de latencia y 400 kbps.
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 400,
      downloadThroughput: (400 * 1024) / 8,
      uploadThroughput: (400 * 1024) / 8,
    });

    await page.addInitScript(() => {
      const first: Record<string, number> = {};
      const targets: Record<string, string> = {
        nav: "header",
        name: "h1",
        image: "#hero img",
        text: "#hero .intro-reveal-text",
      };
      const check = () => {
        for (const [key, selector] of Object.entries(targets)) {
          if (first[key] !== undefined) continue;
          const el = document.querySelector(selector);
          if (el && Number(getComputedStyle(el).opacity) > 0.05) first[key] = performance.now();
        }
        if (Object.keys(first).length < Object.keys(targets).length) requestAnimationFrame(check);
        (window as unknown as { __first: Record<string, number> }).__first = first;
      };
      requestAnimationFrame(check);
    });

    await page.goto("/en", { timeout: 120_000 });
    await page.waitForFunction(() => Object.keys((window as unknown as { __first?: object }).__first ?? {}).length === 4, null, {
      timeout: 60_000,
    });
    const first = await page.evaluate(() => (window as unknown as { __first: Record<string, number> }).__first);

    expect(first.nav).toBeLessThan(first.image);
    expect(first.name).toBeLessThan(first.image);
    expect(first.nav).toBeLessThan(first.text);
    expect(first.name).toBeLessThan(first.text);
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("no movement: everything is in its final state", async ({ page }) => {
      await page.goto("/en");
      const name = page.getByRole("heading", { level: 1 });
      await expect(name).toBeVisible();
      const { opacity, translate } = await name.evaluate((el) => ({
        opacity: getComputedStyle(el).opacity,
        translate: getComputedStyle(el).translate,
      }));
      expect(opacity).toBe("1");
      expect(translate === "none" || translate.startsWith("0px")).toBe(true);

      for (const selector of ["#hero h1", "#hero img", "#hero .intro-reveal-text", "header"]) {
        const animation = await page.locator(selector).first().evaluate((el) => getComputedStyle(el).animationName);
        expect(animation, selector).toBe("none");
      }
    });
  });
});
