import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('page title "Swag Labs"', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Swag Labs');
});

test('header "Swag Labs"', async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await expect(loginPage.header).toBeVisible();
  await expect(loginPage.header).toHaveText('Swag Labs');
});
