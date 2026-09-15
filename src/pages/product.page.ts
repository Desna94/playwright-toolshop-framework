import type { Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly productName: Locator;
  readonly productDesc: Locator;
  readonly productPrice: Locator;
  private readonly addToCartButton: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.locator('[data-test="product-name"]');
    this.productDesc = page.locator('[data-test="product-description"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
  }

  async goto(productId: string): Promise<void> {
    await this.page.goto(`/product/${productId}`);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
