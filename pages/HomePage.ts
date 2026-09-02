import type { Page, Locator } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  readonly searchInput: Locator;
  readonly spotlightSearchInput: Locator;
  readonly modalClose: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator(
      '[data-test="header-search-input"]'
    );

    this.spotlightSearchInput = page.locator(
      '[data-test="spotlight-search-input"]'
    );
    this.modalClose = page.locator(
        '[data-test="modal-close"]');
  }

  async openSearch() {
  const modal = this.page.locator('[data-test="modal"]');

  if (await modal.isVisible()) {
    await this.modalClose.click();
  }

  await this.searchInput.click();
  await this.spotlightSearchInput.click();
}
  async search(text: string) {
    await this.spotlightSearchInput.fill(text);
  }
  async closeSearch() {
  await this.modalClose.click();
}
}