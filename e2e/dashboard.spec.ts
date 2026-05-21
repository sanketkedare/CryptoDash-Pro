import { test, expect } from "@playwright/test";

test.describe("Dashboard — Critical User Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for market data to load (shimmer → real rows)
    await page.waitForSelector("table tbody tr", { timeout: 15000 });
  });

  test("loads the dashboard with market cap table", async ({ page }) => {
    await expect(page.getByText("Cryptocurrency By Market Cap")).toBeVisible();
    await expect(page.locator("table tbody tr").first()).toBeVisible();
  });

  test("clicking a coin row updates the chart title", async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();
    // Chart section should become visible
    await expect(page.getByText("Market Cap (Billions)")).toBeVisible();
  });

  test("Bar / Line chart type toggle works", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Bar" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Line" })).toBeVisible();
    await page.getByRole("button", { name: "Line" }).click();
    // No crash after toggle
    await expect(page.getByRole("button", { name: "Line" })).toBeVisible();
  });

  test("day range selector buttons are clickable", async ({ page }) => {
    for (const label of ["1D", "1W", "1M", "1Y"]) {
      await page.getByRole("button", { name: label }).click();
      await page.waitForTimeout(300);
    }
  });

  test("currency selector switches to USD", async ({ page }) => {
    await page.getByRole("button", { name: /INR/ }).hover();
    await page.getByRole("option", { name: "USD" }).click();
    // Symbol changes in market table header
    await expect(page.getByText("$").first()).toBeVisible();
  });

  test("coin search filters results", async ({ page }) => {
    await page.getByLabel("Search cryptocurrency").fill("bit");
    await expect(page.getByText("Bitcoin")).toBeVisible();
  });

  test("dark mode toggle switches theme", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Toggle dark mode" }).click();
    await expect(html).toHaveClass(/dark/);
  });
});
