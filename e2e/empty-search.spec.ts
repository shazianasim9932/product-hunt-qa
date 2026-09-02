import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.use({
  storageState: undefined,
});

test('user sees a message when no results are found', async ({ page }) => {
  await page.goto('/');

  await page
    .locator('[data-test="header-search-input"]')
    .click();

  const homePage = new HomePage(page);

await homePage.openSearch();
await homePage.search('xyznonexistent987');

await expect(
  page.getByText(/No results found for/)
).toBeVisible();

  await expect(
    page.getByText(/No results found for/)
  ).toBeVisible();
});