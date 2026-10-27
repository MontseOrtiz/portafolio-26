import { expect, test, type Page } from "@playwright/test";

const LOCALES = ["en", "es"] as const;
const SCHEMES = ["light", "dark"] as const;

const copy = {
  en: { imageAlt: "Illustration of Montse coding on her laptop, sitting on a browser window with two dogs" },
  es: { imageAlt: "Ilustración de Montse programando en su laptop, sentada sobre una ventana de navegador con dos perritos" },
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

test.describe("hero content", () => {
  for (const locale of LOCALES) {
    test(`name is the only h1 and image has its alt (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Montse Ortiz");
      await expect(page.locator("#hero img")).toHaveAttribute("alt", copy[locale].imageAlt);
    });
  }

  test("hero has no CTA buttons", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#hero a, #hero button")).toHaveCount(0);
  });

  test("first screen fills the window height minus the nav and its gap", async ({ page }, testInfo) => {
    await page.goto("/en");
    const hero = await page.locator("#hero").boundingBox();
    const viewport = page.viewportSize()!;
    const gap = testInfo.project.name === "mobile" ? 16 : 24;
    // 82px = altura del nav; el contenido puede pasar del mínimo, nunca quedarse corto.
    expect(hero!.height).toBeGreaterThanOrEqual(viewport.height - 82 - gap - 1);
  });
});

const PROJECTS = [
  { slug: "book-diary", name: "Book Diary" },
  { slug: "wod-tracker", name: "WOD Tracker" },
  { slug: "mi-botiquin", name: "Mi botiquín" },
  { slug: "destino-china", name: "Destino China" },
] as const;

// Orden de las diapositivas = orden de content/projects/index.ts.
const ORDER = ["book-diary", "wod-tracker", "destino-china", "mi-botiquin"];
const NAMES: Record<string, string> = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.name]));

test.describe("work showcase", () => {
  test("#work holds every project as a link to its case study", async ({ page }) => {
    await page.goto("/en");
    const links = page.locator("section#work a");
    await expect(links).toHaveCount(ORDER.length);
    for (const [i, slug] of ORDER.entries()) {
      await expect(links.nth(i)).toHaveAttribute("href", `/en/projects/${slug}`);
      await expect(links.nth(i)).toContainText(NAMES[slug]);
    }
  });

  test("the nav Work link lands on the showcase", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "nav links are inline on desktop");
    await page.goto("/en");
    await page.getByRole("banner").getByRole("link", { name: "Work" }).click();
    await expect.poll(() => page.evaluate(() => document.querySelector("#work")!.getBoundingClientRect().top)).toBeLessThan(2);
  });

  test("scrolling shows one project after another until the last", async ({ page }) => {
    await page.goto("/en");
    const { top, vh } = await page.evaluate(() => ({
      top: document.querySelector("#work")!.getBoundingClientRect().top + window.scrollY,
      vh: window.innerHeight,
    }));
    for (const [i, slug] of ORDER.entries()) {
      await page.evaluate((y) => window.scrollTo(0, y), top + i * vh);
      // Solo el proyecto visible se puede enfocar (los demás están tapados).
      const active = page.locator("section#work a:not([inert])");
      await expect(active).toHaveCount(1);
      await expect(active).toHaveAttribute("href", `/en/projects/${slug}`);
      await expect(active).toBeInViewport();
    }
  });

  test("on desktop the first project grows from the container width to the full window", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "expansion is desktop-only");
    await page.goto("/en");
    const media = page.locator(".hero-media");
    // Inserción lateral visible: (ventana - container) / 2 al inicio y 0 al final.
    const inset = () => media.evaluate((el) => {
      const match = /inset\(0px(?: ([\d.]+)px)?/.exec(getComputedStyle(el).clipPath);
      return match ? Number(match[1] ?? 0) : NaN;
    });
    const edge = (page.viewportSize()!.width - (await page.locator("main").boundingBox())!.width) / 2 + 1;
    expect(await inset()).toBeGreaterThan(edge - 2);

    await page.evaluate(() => window.scrollTo(0, document.querySelector("#work")!.getBoundingClientRect().top + window.scrollY));
    await expect.poll(inset).toBeLessThan(1);

    // La expansión no debe crear scroll horizontal.
    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflows).toBe(false);
  });

  test("each project fills the window height and shows from the top (all sizes)", async ({ page }) => {
    await page.goto("/en");
    const media = page.locator(".hero-media");
    await page.evaluate(() => window.scrollTo(0, document.querySelector("#work")!.getBoundingClientRect().top + window.scrollY));
    const box = (await media.boundingBox())!;
    const viewport = page.viewportSize()!;
    expect(Math.round(box.height)).toBe(viewport.height);
    expect(Math.round(box.y)).toBe(0);
    // La imagen se ancla arriba: no se recorta su parte superior.
    await expect(media.locator("img").first()).toHaveCSS("object-position", "50% 0%");
  });

  test("on mobile it is edge to edge and does not expand", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile only");
    await page.goto("/en");
    const media = page.locator(".hero-media");
    await media.evaluate((el) => el.scrollIntoView({ block: "start" }));
    const box = (await media.boundingBox())!;
    expect(Math.round(box.width)).toBe(page.viewportSize()!.width);
  });

  test("name is at the bottom, centred, in white without underline; 'Learn more' appears a few seconds later", async ({ page }) => {
    await page.goto("/en");
    await page.evaluate(() => window.scrollTo(0, document.querySelector("#work")!.getBoundingClientRect().top + window.scrollY));
    const link = page.locator("section#work a:not([inert])");
    const name = link.getByText("Book Diary", { exact: true });
    await expect(name).toHaveCSS("color", "rgb(255, 252, 242)");
    await expect(name).toHaveCSS("text-decoration-line", "none");
    const box = (await name.boundingBox())!;
    const viewport = page.viewportSize()!;
    expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThan(2);
    expect(box.y + box.height).toBeGreaterThan(viewport.height * 0.6);

    const more = link.getByText("Learn more");
    await expect(more).toHaveCSS("opacity", "0");
    const moreBox = await more.boundingBox();
    expect(moreBox!.y).toBeGreaterThan(box.y + box.height - 2);
    await expect(more).toHaveCSS("opacity", "1", { timeout: 6000 });
  });

  test("hero images carry the dark editorial filter", async ({ page }) => {
    await page.goto("/en");
    const filter = await page.locator(".hero-media img").first().evaluate((el) => getComputedStyle(el).filter);
    expect(filter).toContain("brightness");
    expect(filter).toContain("contrast");
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("projects are stacked full height, not sticky and not animated", async ({ page }) => {
      await page.goto("/en");
      const links = page.locator("section#work a");
      await expect(links).toHaveCount(ORDER.length);
      const boxes = await links.evaluateAll((els) => els.map((el) => el.getBoundingClientRect()));
      // Uno debajo de otro, todos del mismo ancho y con el alto de la ventana.
      expect(new Set(boxes.map((b) => Math.round(b.width))).size).toBe(1);
      expect(Math.round(boxes[0].height)).toBe(page.viewportSize()!.height);
      for (let i = 1; i < boxes.length; i++) expect(boxes[i].top).toBeGreaterThan(boxes[i - 1].top);
      await expect(page.locator("section#work a[inert]")).toHaveCount(0);
    });

    for (const locale of ["en", "es"] as const) {
      test(`screenshot of the first project, reduced motion (${locale})`, async ({ page }) => {
        await page.goto(`/${locale}`);
        await ready(page);
        const media = page.locator("section#work a").first();
        await media.evaluate((el) => el.scrollIntoView({ block: "center" }));
        await ready(page);
        // El nav fijo taparía la parte superior de la media en el centro de la ventana.
        await page.addStyleTag({ content: "header { visibility: hidden !important; }" });
        const box = (await media.boundingBox())!;
        const image = await page.screenshot({ animations: "disabled", clip: box });
        expect(image).toMatchSnapshot(`hero-media-reduced-${locale}.png`, { maxDiffPixelRatio: 0.02 });
      });
    }
  });
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
