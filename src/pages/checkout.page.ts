import type { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly productTitle: Locator;

  constructor(page: Page) {
    this.productTitle = page.locator('[data-test="product-title"]');
  }
}
