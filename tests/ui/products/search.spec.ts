import { test, expect } from "../../../src/fixtures/test.fixture";

test("user can search for products", async ({ homePage }) => {
  const searchQuery = "hammer";

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
