import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import users from '../data/users.json';

test.describe('Navbar functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('check navbar opens correctly', async ({ page }) => {
    await loginPage.login({
      username: users.standard.username,
      password: users.standard.password,
    });

    const productsPage = new ProductsPage(page);
    await expect(productsPage.header.navBar.menuButton).toBeVisible();
    await expect(productsPage.header.navBar.allItemsLink).not.toBeVisible();
    await expect(productsPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(productsPage.header.navBar.logoutLink).not.toBeVisible();
    await expect(productsPage.header.navBar.closeMenuButton).not.toBeVisible();

    await productsPage.header.navBar.open();
    await expect(productsPage.header.navBar.allItemsLink).toBeVisible();
    await expect(productsPage.header.navBar.aboutLink).toBeVisible();
    await expect(productsPage.header.navBar.logoutLink).toBeVisible();
    await expect(productsPage.header.navBar.closeMenuButton).toBeVisible();

    await productsPage.header.navBar.close();
    await expect(productsPage.header.navBar.menuButton).toBeVisible();
    await expect(productsPage.header.navBar.allItemsLink).not.toBeVisible();
    await expect(productsPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(productsPage.header.navBar.logoutLink).not.toBeVisible();
    await expect(productsPage.header.navBar.closeMenuButton).not.toBeVisible();

    await expect(productsPage.header.title).toBeVisible();
    await expect(productsPage.header.title).toHaveText('Swag Labs');

    await expect(productsPage.header.cartButton).toBeVisible();
    await expect(productsPage.header.cartBadge).not.toBeVisible();
  });
});
