import { test, expect } from "@playwright/test";

test("homepage loads and has correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Astro Starseed/);
});

test("mobile viewport is applied correctly", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-mobile",
    "Mobile-only test — skipping on desktop"
  );

  await page.goto("/");

  // Viewport should be mobile-sized (< 768px, the md: breakpoint)
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();
  expect(viewport!.width).toBeLessThan(768);

  // Mobile menu button should be visible
  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  await expect(menuButton).toBeVisible();

  // Desktop nav links should be hidden
  const desktopNav = page.locator(".hidden.md\\:flex");
  await expect(desktopNav).toBeHidden();
});
