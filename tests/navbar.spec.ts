import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

test.describe('Navbar functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('check navbar opens correctly', async ({ page }) => {
    await loginPage.login({
      username: 'standard_user',
      password: 'secret_sauce',
    });

    const productsPage = new ProductsPage(page);
    await expect(productsPage.navBar.menuButton).toBeVisible();
    await expect(productsPage.navBar.allItemsLink).not.toBeVisible();
    await expect(productsPage.navBar.aboutLink).not.toBeVisible();
    await expect(productsPage.navBar.logoutLink).not.toBeVisible();
    await expect(productsPage.navBar.closeMenuButton).not.toBeVisible();

    await productsPage.navBar.open();
    await expect(productsPage.navBar.allItemsLink).toBeVisible();
    await expect(productsPage.navBar.aboutLink).toBeVisible();
    await expect(productsPage.navBar.logoutLink).toBeVisible();
    await expect(productsPage.navBar.closeMenuButton).toBeVisible();

    await productsPage.navBar.close();
    await expect(productsPage.navBar.menuButton).toBeVisible();
    await expect(productsPage.navBar.allItemsLink).not.toBeVisible();
    await expect(productsPage.navBar.aboutLink).not.toBeVisible();
    await expect(productsPage.navBar.logoutLink).not.toBeVisible();
    await expect(productsPage.navBar.closeMenuButton).not.toBeVisible();
  });
});
