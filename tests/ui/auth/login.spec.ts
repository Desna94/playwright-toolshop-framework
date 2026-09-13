import { test, expect } from "../../../src/fixtures/test.fixture";
import { env } from "../../../src/utils/env";

test("user can log in with valid credentials", async ({
  loginPage,
  accountPage,
  page,
}) => {
  await loginPage.goto();
  await loginPage.login(env.userEmail, env.userPassword);

  await expect(page).toHaveURL("/account");
  await expect(accountPage.pageTitle).toHaveText("My account");
});

test("user cannot log in with invalid credentials", async ({
  loginPage,
  page,
}) => {
  const wrongPassword = "wrongpassword";
  const loginErrorMessage = "Invalid email or password";

  await loginPage.goto();
  await loginPage.login(env.userEmail, wrongPassword);

  await expect(page).toHaveURL("/auth/login");
  await expect(loginPage.loginError).toHaveText(loginErrorMessage);
});
