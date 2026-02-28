import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import users from '../../data/users.json';
import { ProductPage } from '../../pages/product.page';

test.describe('Cart functionality @cart', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);

    await loginPage.login({
      username: users.standard.username,
      password: users.standard.password,
    });

    await expect(page).toHaveURL('/inventory.html');
    productsPage = new ProductsPage(page);
    await expect(productsPage.header.cartBadge).not.toBeVisible();
  });

  test('single product can be added and removed from cart', async ({ page }) => {
    const product = productsPage.findProductByName('Sauce Labs Backpack');
    await product.name.click();
    await expect(product.removeButton).not.toBeVisible();

    productPage = new ProductPage(page);
    await productPage.addToCartButton.click();

    await expect(productPage.addToCartButton).not.toBeVisible();
    await expect(productPage.removeButton).toBeVisible();
    await expect(productPage.removeButton).toHaveText('Remove');
    await expect(productPage.header.cartBadge).toBeVisible();
    await expect(productPage.header.cartBadge).toHaveText('1');

    await productPage.removeButton.click();
    await expect(productPage.removeButton).not.toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toHaveText('Add to cart');
    await expect(productPage.header.cartBadge).not.toBeVisible();
  });
});
