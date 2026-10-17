import { expect, test, type Page } from "@playwright/test";

const copy = {
  en: { sections: ["Work experience", "Education", "Skills", "Languages"], download: "Download PDF", tabs: "CV language", updated: "Last updated" },
  es: { sections: ["Experiencia laboral", "Formación", "Habilidades", "Idiomas"], download: "Descargar PDF", tabs: "Idioma del CV", updated: "Última actualización" },
} as const;

const cv = (page: Page) => page.locator("section#cv");

for (const locale of ["en", "es"] as const) {
  const c = copy[locale];

  test.describe(`cv ${locale}`, () => {
    test("heading order: h2 name, h3 sections, h4 roles; the h1 stays in About", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(cv(page).getByRole("heading", { level: 2 })).toHaveText("Montserrat Ortiz");
      const h3 = await cv(page).getByRole("heading", { level: 3 }).allTextContents();
      expect(h3).toEqual(c.sections);
      expect(await cv(page).getByRole("heading", { level: 4 }).count()).toBeGreaterThanOrEqual(8 + 4);
    });

    test("tabs are links to the same anchor in each language; the active one is aria-current", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      const tabs = cv(page).getByRole("navigation", { name: c.tabs });
      await expect(tabs.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/about#cv");
      await expect(tabs.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/about#cv");
      await expect(tabs.locator("[aria-current='page']")).toHaveText(locale === "en" ? "English" : "Español");
    });

    test("PDF download points at this language's file and the file is served", async ({ page, request }) => {
      await page.goto(`/${locale}/about`);
      const links = cv(page).getByRole("link", { name: new RegExp(c.download) });
      await expect(links).toHaveCount(2);
      for (const link of await links.all()) await expect(link).toHaveAttribute("href", `/cv/montse-ortiz-cv-${locale}.pdf`);
      const response = await request.get(`/cv/montse-ortiz-cv-${locale}.pdf`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("pdf");
    });

    test("external links open in a new tab with accessible text; no phone number", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      const linkedin = cv(page).getByRole("link", { name: /LinkedIn/ });
      await expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/montse-ortiz/");
      await expect(linkedin).toHaveAttribute("target", "_blank");
      await expect(linkedin).toHaveAttribute("rel", /noopener/);
      await expect(cv(page).getByRole("link", { name: /GitHub/ })).toHaveAttribute("target", "_blank");
      await expect(cv(page).getByRole("link", { name: /montseortiz29@gmail.com/ })).toHaveAttribute("href", "mailto:montseortiz29@gmail.com");
      expect(await cv(page).innerText()).not.toContain("+52");
    });

    test("footer row: last updated and download", async ({ page }) => {
      await page.goto(`/${locale}/about`);
      await expect(cv(page).getByText(new RegExp(`${c.updated}:`))).toBeVisible();
    });
  });
}

test("achievement figures are highlighted in the sand color", async ({ page }) => {
  await page.goto("/en/about");
  const sand = await page.evaluate(() => {
    const el = document.createElement("span");
    el.style.color = "var(--token-sand)";
    document.body.append(el);
    const color = getComputedStyle(el).color;
    el.remove();
    return color;
  });
  const figures = cv(page).locator("span.text-sand");
  expect(await figures.allTextContents()).toEqual(["100", "95", "100", "10", "~30%", "75%", "60", "20"]);
  await expect(figures.first()).toHaveCSS("color", sand);
  await expect(cv(page).locator("span.text-sand", { hasText: "75%" })).toHaveCount(1);
});

test("the email stays on one line on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("/en/about");
  const box = (await cv(page).getByRole("link", { name: /montseortiz29@gmail.com/ }).boundingBox())!;
  expect(box.height).toBeLessThan(30);
});

test("clicking Español switches to /es/about#cv", async ({ page }) => {
  await page.goto("/en/about");
  await cv(page).getByRole("link", { name: "Español" }).click();
  await page.waitForURL("**/es/about#cv");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(cv(page).getByRole("heading", { level: 3, name: "Experiencia laboral" })).toBeVisible();
});

test("the nav CV link and the old /cv route land on the sheet", async ({ page }) => {
  await page.goto("/en/cv");
  await expect(page).toHaveURL(/\/en\/about#cv$/);
  await expect(cv(page)).toBeVisible();
});

test.describe("layout", () => {
  test("sections use 2/3/7 columns on desktop and stack on mobile", async ({ page }, testInfo) => {
    await page.goto("/en/about");
    const section = cv(page).locator("section[aria-labelledby='cv-experience']");
    const label = (await section.getByRole("heading", { level: 3 }).boundingBox())!;
    const entry = section.locator("article").first();
    const role = (await entry.locator("h4").boundingBox())!;
    const bullets = (await entry.locator("ul").boundingBox())!;
    if (testInfo.project.name === "desktop") {
      expect(label.x).toBeLessThan(role.x);
      expect(role.x).toBeLessThan(bullets.x);
      const roleCol = (await entry.locator("h4").evaluate((el) => el.parentElement!.getBoundingClientRect().width));
      expect(bullets.width / roleCol).toBeGreaterThan(2.1);
      expect(bullets.width / roleCol).toBeLessThan(2.5);
    } else {
      expect(role.y).toBeGreaterThan(label.y);
      expect(bullets.y).toBeGreaterThan(role.y);
      expect(Math.abs(role.x - label.x)).toBeLessThan(2);
    }
  });

  test("tabs: vertical at the sheet's right edge on desktop, horizontal above it on mobile; inactive is powder", async ({ page }, testInfo) => {
    await page.goto("/en/about");
    const tab = cv(page).getByRole("link", { name: "Español" });
    const sheet = (await cv(page).locator("h2#cv-title").evaluate((el) => {
      const r = el.closest(".flex-1")!.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    }));
    const box = (await tab.boundingBox())!;
    if (testInfo.project.name === "desktop") {
      expect(Math.abs(box.x - (sheet.x + sheet.w))).toBeLessThan(2);
      expect(box.height).toBeGreaterThan(box.width);
    } else {
      expect(box.y + box.height).toBeLessThanOrEqual(sheet.y + 1);
      expect(box.width).toBeGreaterThan(box.height);
      await expect(cv(page).getByRole("button")).toHaveCount(0);
    }
    const inactive = await tab.evaluate((el) => getComputedStyle(el).backgroundColor);
    const powder = await page.evaluate(() => {
      const el = document.createElement("span");
      el.style.color = "var(--token-powder)";
      document.body.append(el);
      const color = getComputedStyle(el).color;
      el.remove();
      return color;
    });
    expect(inactive).toBe(powder);
  });

  test("download button is full width on mobile", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/en/about");
    const button = (await cv(page).locator("header").getByRole("link", { name: /Download PDF/ }).boundingBox())!;
    const header = (await cv(page).locator("header").boundingBox())!;
    expect(Math.abs(button.width - header.width)).toBeLessThan(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  for (const scheme of ["light", "dark"] as const) {
    test.describe(scheme, () => {
      test.use({ colorScheme: scheme });
      test(`strip is ${scheme === "light" ? "accent" : "surface"}, sheet is surface`, async ({ page }) => {
        await page.goto("/en/about");
        const colors = await page.evaluate(() => {
          const probe = (token: string) => {
            const el = document.createElement("span");
            el.style.color = `var(--token-${token})`;
            document.body.append(el);
            const color = getComputedStyle(el).color;
            el.remove();
            return color;
          };
          const strip = getComputedStyle(document.querySelector("section#cv")!).backgroundColor;
          const sheet = getComputedStyle(document.querySelector("section#cv .flex-1 > div")!).backgroundColor;
          return { strip, sheet, accent: probe("accent"), surface: probe("surface") };
        });
        expect(colors.strip).toBe(scheme === "light" ? colors.accent : colors.surface);
        expect(colors.sheet).toBe(colors.surface);
      });
    });
  }
});

test.describe("print", () => {
  test("only the sheet is printed: no nav, About, tabs, strip or footer row", async ({ page }) => {
    await page.goto("/en/about");
    await page.emulateMedia({ media: "print" });
    await expect(page.getByRole("banner")).toBeHidden();
    await expect(page.locator("#about")).toBeHidden();
    await expect(cv(page).getByRole("navigation", { name: "CV language" })).toBeHidden();
    await expect(cv(page).getByText(/Last updated/)).toBeHidden();
    await expect(cv(page).getByRole("link", { name: /Download PDF/ })).toBeHidden();
    await expect(cv(page).getByRole("heading", { level: 2 })).toBeVisible();
    expect(await cv(page).evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("sheet is visible without a transition", async ({ page }) => {
    await page.goto("/en/about");
    const sheet = cv(page).locator(".reveal");
    await expect(sheet).toHaveCSS("opacity", "1");
    await expect(sheet).toHaveCSS("transition-duration", "0s");
  });
});

test.describe("screenshots", () => {
  test.use({ reducedMotion: "reduce" });
  for (const locale of ["en", "es"] as const) {
    for (const scheme of ["light", "dark"] as const) {
      test.describe(`${locale} ${scheme}`, () => {
        test.use({ colorScheme: scheme });
        test(`cv ${locale} ${scheme}`, async ({ page }) => {
          await page.goto(`/${locale}/about`);
          await page.evaluate(() => document.fonts.ready);
          await cv(page).scrollIntoViewIfNeeded();
          await expect(cv(page)).toHaveScreenshot(`cv-${locale}-${scheme}.png`, { animations: "disabled", mask: [page.getByRole("banner")] });
        });
      });
    }
  }
});
