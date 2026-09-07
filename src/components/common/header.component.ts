import type { Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly cartQuantity: Locator;

  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
    this.cartLink = page.locator('[data-test="nav-cart"]');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
