import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

test.describe('Valid login with different users', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('valid login', async ({ page }) => {
    await loginPage.login({
      username: 'standard_user',
      password: 'secret_sauce',
    });

    await expect(page).toHaveURL('/inventory.html');
    const productsPage = new ProductsPage(page);
    await expect(productsPage.title).toHaveText('Products');
    await expect(productsPage.header.navBar.menuButton).toBeVisible();
  });

  test('login with locked user', async ({ page }) => {
    await expect(loginPage.errorMessage).not.toBeVisible();
    await loginPage.login({
      username: 'locked_out_user',
      password: 'secret_sauce',
    });

    await expect(page).toHaveURL('/');
    await expect(loginPage.header).toHaveText('Swag Labs');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
    await loginPage.closeErrorMessageButton.click();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});
