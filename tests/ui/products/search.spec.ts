import { test, expect } from "@playwright/test";
import { HomePage } from "../../../src/pages/home.page";

test("user can search for products", async ({ page }) => {
  const searchQuery = "hammer";

  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.search(searchQuery);

  const resultCount = await homePage.getSearchResultCount();

  await expect(homePage.productNames).toHaveCount(resultCount);

  for (let i = 0; i < resultCount; i++) {
    await expect(homePage.productNames.nth(i)).toContainText(searchQuery, {
      ignoreCase: true,
    });
  }
});
