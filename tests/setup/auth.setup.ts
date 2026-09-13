import { test as setup, expect } from "../../src/fixtures/test.fixture";
import { env } from "../../src/utils/env";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page, loginPage, accountPage }) => {
  await loginPage.goto();
  await loginPage.login(env.userEmail, env.userPassword);

  await expect(page).toHaveURL("/account");
  await expect(accountPage.pageTitle).toHaveText("My account");

  await page.context().storageState({
    path: authFile,
  });
});
