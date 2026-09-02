import { test, expect } from '@playwright/test';

test('user can open a product category', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: 'Best Products' }).click();

  await page.getByRole('link', { name: 'AI notetakers AI notetakers' }).click();

  await expect(page).toHaveURL(/\/categories\//);

  await expect(
    page.getByRole('heading', { name: 'The best AI notetakers to use in' })
  ).toBeVisible();
});