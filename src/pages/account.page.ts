import type { Locator, Page } from "@playwright/test";

export class AccountPage {
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.pageTitle = page.locator('[data-test="page-title"]');
  }
}
