import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("body")).toBeVisible();
});

test("contact page loads", async ({ page }) => {
  const response = await page.goto("/contact");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
