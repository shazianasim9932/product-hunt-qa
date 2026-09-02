import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('user can search for a product', async ({ page }) => {
  await page.goto('/');

  const homePage = new HomePage(page);

  await homePage.openSearch();
  await homePage.search('AI');

  const results = page.locator('[data-test^="spotlight-result-"]');

  await expect(results.first()).toBeVisible();
  
  await homePage.closeSearch();
});