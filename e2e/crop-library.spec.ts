import { test, expect } from "@playwright/test";

test.describe("Crop Library", () => {
  test.slow();

  test("loads and displays crops", async ({ page }) => {
    await page.goto("/crops", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: /crop library/i })).toBeVisible();
    await expect(page.locator('a[href="/crops/maize"]')).toBeVisible();
  });

  test("search filters crops by name", async ({ page }) => {
    await page.goto("/crops", { waitUntil: "domcontentloaded" });
    
    const searchInput = page.getByRole("searchbox").or(page.getByPlaceholder(/search/i));
    
    // Clear first and type sequentially to trigger react state/input events reliably
    await searchInput.clear();
    await searchInput.pressSequentially("maize", { delay: 50 });

    // Assert filtering took effect
    await expect(page.locator('a[href="/crops/maize"]')).toBeVisible();
    await expect(page.locator('a[href="/crops/cassava"]')).not.toBeVisible();
  });

  test("clicking a crop navigates to its detail page", async ({ page }) => {
    await page.goto("/crops", { waitUntil: "domcontentloaded" });
    
    const maizeLink = page.locator('a[href="/crops/maize"]');
    await maizeLink.click();
    
    await expect(page).toHaveURL(/\/crops\/maize/);
    await expect(page.locator("h1")).toContainText("Maize");
  });

  test("crop detail page shows all tabs", async ({ page }) => {
    await page.goto("/crops/maize", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("tab", { name: /land prep|preparation/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /fertilizer/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /pests/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /harvest/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /quiz/i })).toBeVisible();
  });

  test("quiz tab shows a question", async ({ page }) => {
    await page.goto("/crops/maize", { waitUntil: "domcontentloaded" });
    await page.getByRole("tab", { name: /quiz/i }).click();
    await expect(page.getByText(/question 1 of/i)).toBeVisible();
  });
});