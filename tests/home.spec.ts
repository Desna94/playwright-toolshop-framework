import { test, expect } from "@playwright/test";

test("user can search for products", async ({ page }) => {
  //Arrange
  const searchQuery = "hammer";
  await page.goto("/");

  //Act
  await page.locator('[data-test="search-query"]').fill(searchQuery);
  await page.locator('[data-test="search-submit"]').click();
  await expect(page.locator('[data-test="search_completed"]')).toBeVisible();
  const resultCountText = await page
    .getByTestId("search-result-count")
    .innerText();

  const resultCount = Number(resultCountText.match(/\d+/)?.[0]);

  //Assert
  await expect(page.locator('a[data-test^="product-"]')).toHaveCount(
    resultCount,
  );
});
