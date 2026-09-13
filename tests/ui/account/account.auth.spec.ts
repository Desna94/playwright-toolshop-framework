import { test, expect } from "../../../src/fixtures/test.fixture";

test("authenticated user can access account page", async ({
  page,
  accountPage,
}) => {
  await page.goto("/account");

  await expect(page).toHaveURL("/account");
  await expect(accountPage.pageTitle).toHaveText("My account");
});
