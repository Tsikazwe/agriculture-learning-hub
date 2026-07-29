import { test, expect } from "@playwright/test";

test.describe("Pest Directory", () => {
  test("loads and displays pests", async ({ page }) => {
    await page.goto("/pests");
    await expect(
      page.getByRole("heading", { name: /pest.*disease directory/i })
    ).toBeVisible();
    await expect(page.locator('a[href="/pests/fall-armyworm"]')).toBeVisible();
  });

  test("clicking a pest navigates to its detail page", async ({ page }) => {
    await page.goto("/pests");
    await page.locator('a[href="/pests/fall-armyworm"]').click();
    await expect(page).toHaveURL(/\/pests\/fall-armyworm/);
    await expect(page.locator("h1")).toContainText("Fall Armyworm");
  });

  test("pest detail page shows affected crops", async ({ page }) => {
    await page.goto("/pests/fall-armyworm");
    await expect(page.getByText(/affects/i)).toBeVisible();
    await expect(page.locator('a[href="/crops/maize"]')).toBeVisible();
  });
});