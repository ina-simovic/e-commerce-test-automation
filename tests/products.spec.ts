import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

test.describe('Product functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('product is displayed after login', async ({ page }) => {
    await loginPage.login({
      username: 'standard_user',
      password: 'secret_sauce',
    });

    await expect(page).toHaveURL('/inventory.html');
    const productsPage = new ProductsPage(page);

    const dummyProduct1 = productsPage.findProductByName('Sauce Labs Backpack');
    await expect(dummyProduct1.image).toBeVisible();
    await expect(dummyProduct1.name).toBeVisible();
    await expect(dummyProduct1.name).toHaveText('Sauce Labs Backpack');
    await expect(dummyProduct1.description).toBeVisible();
    await expect(dummyProduct1.description).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await expect(dummyProduct1.price).toBeVisible();
    await expect(dummyProduct1.price).toHaveText('$29.99');
    await expect(dummyProduct1.addToCartButton).toBeVisible();

    const dummyProduct2 = productsPage.findProductByPrice('$7.99');
    await expect(dummyProduct2.image).toBeVisible();
    await expect(dummyProduct2.name).toBeVisible();
    await expect(dummyProduct2.name).toHaveText('Sauce Labs Onesie');
    await expect(dummyProduct2.description).toBeVisible();
    await expect(dummyProduct2.description).toHaveText(
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    );
    await expect(dummyProduct2.price).toBeVisible();
    await expect(dummyProduct2.price).toHaveText('$7.99');
    await expect(dummyProduct2.addToCartButton).toBeVisible();
  });
});
