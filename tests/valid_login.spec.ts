import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

test.describe('Valid login with different users', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logInWith({
      username: 'standard_user',
      password: 'secret_sauce',
    });

    await expect(page).toHaveURL('/inventory.html');
    const productsPage = new ProductsPage(page);
    await expect(productsPage.title).toHaveText('Products');
  });
});
