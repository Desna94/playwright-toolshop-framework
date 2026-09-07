import type { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly searchInput: Locator;
  private readonly searchSubmitButton: Locator;
  private readonly searchCompleted: Locator;
  private readonly searchResultCount: Locator;
  readonly productNames: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmitButton = page.locator('[data-test="search-submit"]');
    this.searchCompleted = page.locator('[data-test="search_completed"]');
    this.searchResultCount = page.getByTestId("search-result-count");
    this.productNames = page.locator('[data-test="product-name"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchSubmitButton.click();
    await this.searchCompleted.waitFor({ state: "visible" });
  }

  async getSearchResultCount(): Promise<number> {
    const text = await this.searchResultCount.innerText();
    const match = text.match(/\d+/);

    if (!match) {
      throw new Error(`Unable to parse search result count from: "${text}"`);
    }

    return Number(match[0]);
  }

  async getProductName(index = 0): Promise<string> {
    await this.productNames.nth(index).waitFor({ state: "visible" });
    return this.productNames.nth(index).innerText();
  }

  async openProduct(index = 0): Promise<void> {
    await this.productNames.nth(index).click();
  }
}
