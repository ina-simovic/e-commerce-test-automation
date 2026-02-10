import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

test.describe('Product functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);

    await loginPage.login({
      username: 'standard_user',
      password: 'secret_sauce',
    });

    await expect(page).toHaveURL('/inventory.html');
    productsPage = new ProductsPage(page);
  });

  test('check product count', async () => {
    const allProducts = await productsPage.findAllProducts();
    expect(allProducts.length).toBe(6);
  });

  test('product is displayed after login - find by name', async () => {
    const product = productsPage.findProductByName('Sauce Labs Backpack');
    await expect(product.image).toBeVisible();
    await expect(product.name).toBeVisible();
    await expect(product.name).toHaveText('Sauce Labs Backpack');
    await expect(product.description).toBeVisible();
    await expect(product.description).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await expect(product.price).toBeVisible();
    await expect(product.price).toHaveText('$29.99');
    await expect(product.addToCartButton).toBeVisible();
  });

  test('product is displayed after login - find by price', async () => {
    const product = productsPage.findProductByPrice('$7.99');
    await expect(product.image).toBeVisible();
    await expect(product.name).toBeVisible();
    await expect(product.name).toHaveText('Sauce Labs Onesie');
    await expect(product.description).toBeVisible();
    await expect(product.description).toHaveText(
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    );
    await expect(product.price).toBeVisible();
    await expect(product.price).toHaveText('$7.99');
    await expect(product.addToCartButton).toBeVisible();
  });

  // TODO
  test.skip('product sort by: name ASC', async () => {});
});
