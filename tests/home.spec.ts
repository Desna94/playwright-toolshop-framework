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
  const productNames = page.locator('[data-test="product-name"]');
  await expect(productNames).toHaveCount(resultCount);

  for (let i = 0; i < resultCount; i++) {
    await expect(productNames.nth(i)).toContainText(searchQuery, {
      ignoreCase: true,
    });
  }
});

test("User can add a product to cart", async ({ page }) => {
  //Arrange
  await page.goto("/");
  const firstProduct = page.locator('[data-test="product-name"]');
  await expect(firstProduct.first()).toBeVisible();
  const productName = await firstProduct.first().innerText();

  //Act
  await firstProduct.first().click();

  //Assert
  await expect(page).toHaveURL(/\/product\//);
  await expect(page.locator('[data-test="product-name"]')).toHaveText(
    productName,
  );

  //Act
  await page.locator('[data-test="add-to-cart"]').click();

  //Assert
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText("1");

  //Act
  await page.locator('[data-test="nav-cart"]').click();

  //Assert
  await expect(page).toHaveURL("/checkout");
  await expect(page.locator('[data-test="product-title"]')).toHaveText(
    productName,
  );
});
