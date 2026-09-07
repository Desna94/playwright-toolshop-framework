import type { Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly productName: Locator;
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.productName = page.locator('[data-test="product-name"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
