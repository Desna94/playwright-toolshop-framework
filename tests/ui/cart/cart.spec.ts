import { test, expect } from "@playwright/test";
import { HomePage } from "../../../src/pages/home.page";
import { ProductPage } from "../../../src/pages/product.page";
import { HeaderComponent } from "../../../src/components/common/header.component";
import { CheckoutPage } from "../../../src/pages/checkout.page";

test("user can add a product to cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const header = new HeaderComponent(page);
  const checkoutPage = new CheckoutPage(page);

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
