import { test, expect } from '@playwright/test';

test('Product Hunt homepage loads successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle(/Product Hunt/i);
});