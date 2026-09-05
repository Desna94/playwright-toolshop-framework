import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";
import { AccountPage } from "../src/pages/account.page";
import { env } from "../src/utils/env";

test("user can log in with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.goto();
  await loginPage.login(env.userEmail, env.userPassword);

  await expect(page).toHaveURL("/account");
  await expect(accountPage.pageTitle).toHaveText("My account");
});

test("user cannot log in with invalid credentials", async ({ page }) => {
  const wrongPassword = "wrongpassword";
  const loginErrorMessage = "Invalid email or password";

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(env.userEmail, wrongPassword);

  await expect(page).toHaveURL("/auth/login");
  await expect(loginPage.loginError).toHaveText(loginErrorMessage);
});
