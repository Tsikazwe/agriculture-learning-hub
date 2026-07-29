import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("unauthenticated user is redirected away from dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("sign-in page loads correctly", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
  });

  test("sign-up page loads correctly", async ({ page }) => {
    await page.goto("/sign-up");
    await expect(page.getByText(/sign up|create.*account/i).first()).toBeVisible();
  });
});