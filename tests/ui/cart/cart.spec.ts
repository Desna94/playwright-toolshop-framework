import { test, expect } from "../../../src/fixtures/test.fixture";

test("user can add a product to cart", async ({
  homePage,
  productPage,
  header,
  checkoutPage,
  page,
}) => {
  await homePage.goto();

  const productName = await homePage.getProductName();
  await homePage.openProduct();

  await expect(page).toHaveURL(/\/product\//);
  await expect(productPage.productName).toHaveText(productName);

  await productPage.addToCart();

  await expect(header.cartQuantity).toHaveText("1");
  await header.openCart();

  await expect(page).toHaveURL("/checkout");
  await expect(checkoutPage.productTitle).toHaveText(productName);
});
