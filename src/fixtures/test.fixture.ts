import { test as base } from "@playwright/test";

import { AuthApiClient } from "../api/clients/auth.client";
import { ProductsApiClient } from "../api/clients/products.client";
import { HeaderComponent } from "../components/common/header.component";
import { AccountPage } from "../pages/account.page";
import { CheckoutPage } from "../pages/checkout.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ProductPage } from "../pages/product.page";

type Fixtures = {
  authApi: AuthApiClient;
  productsApi: ProductsApiClient;
  accountPage: AccountPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productPage: ProductPage;
  header: HeaderComponent;
};

export const test = base.extend<Fixtures>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthApiClient(request);

    await use(authApi);
  },

  productsApi: async ({ request }, use) => {
    const productsApi = new ProductsApiClient(request);

    await use(productsApi);
  },

  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);

    await use(accountPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);

    await use(checkoutPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);

    await use(productPage);
  },

  header: async ({ page }, use) => {
    const header = new HeaderComponent(page);

    await use(header);
  },
});

export { expect } from "@playwright/test";
