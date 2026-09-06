import { test, expect } from "@playwright/test";

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
