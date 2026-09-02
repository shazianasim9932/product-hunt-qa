import { test, expect } from '@playwright/test';

test('user can navigate from header navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: 'Best Products' }).click();

  await expect(page).toHaveURL(/ref=header_nav/);
});