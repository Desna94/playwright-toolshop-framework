import { test, expect } from "@playwright/test";

test("user can log in with valid credentials", async ({ page }) => {
  //Arrange
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";

  await page.goto("/auth/login");

  //Act
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();

  //Assert
  await expect(page).toHaveURL("/account");
  await expect(page.locator('[data-test="page-title"]')).toHaveText(
    "My account",
  );
});

test("user cannot log in with invalid credentials", async ({ page }) => {
  //Arrange
  const email = "invalid@example.com";
  const password = "wrongpassword";

  await page.goto("/auth/login");

  //Act
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();

  //Assert
  await expect(page).toHaveURL("/auth/login");
  await expect(page.locator('[data-test="login-error"]')).toHaveText(
    "Invalid email or password",
  );
});
