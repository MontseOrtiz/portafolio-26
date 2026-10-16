import { expect, test, type Page } from "@playwright/test";

const LOCALES = ["en", "es"] as const;
const SCHEMES = ["light", "dark"] as const;

const copy = {
  en: { skip: "Skip to content", open: "Open menu", close: "Close menu", toEs: "Switch to Spanish", toEn: "Switch to English", toDark: "Switch to dark mode", toLight: "Switch to light mode" },
  es: { skip: "Saltar al contenido", open: "Abrir menú", close: "Cerrar menú", toEs: "Cambiar a español", toEn: "Cambiar a inglés", toDark: "Cambiar a modo oscuro", toLight: "Cambiar a modo claro" },
} as const;

async function ready(page: Page) {
  await page.evaluate(() => document.fonts.ready);
}

// En móvil, los links y toggles viven en el panel: hay que abrirlo antes de usarlos.
async function openMenuIfMobile(page: Page, locale: (typeof LOCALES)[number], project: string) {
  if (project !== "mobile") return;
  await page.getByRole("button", { name: copy[locale].open }).click();
}

for (const locale of LOCALES) {
  for (const scheme of SCHEMES) {
    test.describe(`nav ${locale} ${scheme}`, () => {
      test.use({ colorScheme: scheme });

      test(`screenshot ${locale} ${scheme}`, async ({ page }) => {
        await page.goto(`/${locale}`);
        await ready(page);
        await expect(page).toHaveScreenshot(`nav-${locale}-${scheme}.png`, {
          animations: "disabled",
        });
      });
    });
  }
}

test.describe("keyboard and skip link", () => {
  for (const locale of LOCALES) {
    test(`skip link is the first focus stop (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.keyboard.press("Tab");
      const skip = page.getByRole("link", { name: copy[locale].skip });
      await expect(skip).toBeFocused();
      await expect(skip).toBeVisible();
    });
  }
});

test.describe("mobile menu", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "menu button only exists under 768px");
  });

  test("opens, sets aria-expanded and closes with Escape", async ({ page }) => {
    await page.goto("/en");
    // Localizador por aria-controls: su nombre cambia entre "Open menu" y "Close menu".
    const button = page.locator("[aria-controls=\"site-menu\"]");
    await expect(button).toHaveAttribute("aria-expanded", "false");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(button).toHaveAccessibleName(copy.en.close);
    await expect(page.locator("#site-menu")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#site-menu")).toBeHidden();
    await expect(button).toBeFocused();
  });

  test("keeps focus inside the panel while open", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: copy.en.open }).click();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => document.getElementById("site-menu")?.contains(document.activeElement));
      expect(inside, `focus escaped the panel on Tab ${i + 1}`).toBe(true);
    }
  });
});

test.describe("language toggle", () => {
  for (const locale of LOCALES) {
    test(`switches between /en and /es (starting at ${locale})`, async ({ page }, testInfo) => {
      const from = locale;
      const to = locale === "en" ? "es" : "en";
      await page.goto(`/${from}`);
      await openMenuIfMobile(page, from, testInfo.project.name);
      await page.getByRole("link", { name: to === "es" ? copy[from].toEs : copy[from].toEn }).click();
      await page.waitForURL(`**/${to}`);
      await expect(page.locator("html")).toHaveAttribute("lang", to);
    });
  }
});

test.describe("theme persistence", () => {
  test.use({ colorScheme: "light" });

  test("chosen theme survives a reload", async ({ page }, testInfo) => {
    await page.goto("/en");
    await openMenuIfMobile(page, "en", testInfo.project.name);
    await page.getByRole("button", { name: copy.en.toDark }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
