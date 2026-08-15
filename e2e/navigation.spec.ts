import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.slow(); // Gives Next.js route compilation extra time on cold starts

  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /agriculture learning hub/i })
    ).toBeVisible();
  });

  test("navbar links work correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

    const nav = page.getByRole("navigation");

    await nav.locator('a[href="/crops"]').click();
    await page.waitForURL(/\/crops/);
    await expect(page).toHaveURL(/\/crops/);

    await nav.locator('a[href="/pests"]').click();
    await page.waitForURL(/\/pests/);
    await expect(page).toHaveURL(/\/pests/);

    await nav.locator('a[href="/calendar"]').click();
    await page.waitForURL(/\/calendar/);
    await expect(page).toHaveURL(/\/calendar/);
  });

  test("404 page shows for nonexistent routes", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
    await expect(page.getByText("404")).toBeVisible();
  });

  test("calendar page loads with crop data", async ({ page }) => {
    await page.goto("/calendar", { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /seasonal planting calendar/i })
    ).toBeVisible();
  });
});