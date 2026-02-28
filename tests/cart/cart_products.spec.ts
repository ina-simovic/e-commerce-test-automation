import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import users from '../../data/users.json';
import products from '../../data/products.json';

test.describe('Cart functionality @cart', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);

    await loginPage.login({
      username: users.standard.username,
      password: users.standard.password,
    });

    await expect(page).toHaveURL('/inventory.html');
    productsPage = new ProductsPage(page);
  });

  test('single product is displayed correctly in cart', async ({ page }) => {
    await expect(productsPage.header.cartBadge).not.toBeVisible();

    const product = productsPage.findProductByName('Sauce Labs Backpack');
    await expect(product.removeButton).not.toBeVisible();

    await product.addToCartButton.click();
    await expect(product.addToCartButton).not.toBeVisible();
    await expect(product.removeButton).toBeVisible();
    await expect(productsPage.header.cartBadge).toBeVisible();
    await expect(productsPage.header.cartBadge).toHaveText('1');

    await productsPage.header.cartButton.click();
    cartPage = new CartPage(page);

    const cartProduct = cartPage.findCartProductByName('Sauce Labs Backpack');
    await expect(cartProduct.quantity).toBeVisible();
    await expect(cartProduct.quantity).toHaveText('1');
    await expect(cartProduct.name).toBeVisible();
    await expect(cartProduct.name).toHaveText('Sauce Labs Backpack');
    await expect(cartProduct.description).toBeVisible();
    await expect(cartProduct.description).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await expect(cartProduct.price).toBeVisible();
    await expect(cartProduct.price).toHaveText('$29.99');
    await expect(cartProduct.removeButton).toBeVisible();

    expect((await cartPage.findAllCartProducts()).length).toBe(1);
  });

  test('multiple products are displayed correctly in cart', async ({
    page,
  }) => {
    await expect(productsPage.header.cartBadge).not.toBeVisible();

    // add product1 to cart
    const product1 = productsPage.findProductByName('Sauce Labs Backpack');
    await expect(product1.removeButton).not.toBeVisible();
    await product1.addToCartButton.click();
    await expect(product1.addToCartButton).not.toBeVisible();
    await expect(product1.removeButton).toBeVisible();
    await expect(productsPage.header.cartBadge).toBeVisible();
    await expect(productsPage.header.cartBadge).toHaveText('1');

    // add product2 to cart
    const product2 = productsPage.findProductByName('Sauce Labs Bike Light');
    await expect(product2.removeButton).not.toBeVisible();
    await product2.addToCartButton.click();
    await expect(product2.addToCartButton).not.toBeVisible();
    await expect(product2.removeButton).toBeVisible();
    await expect(productsPage.header.cartBadge).toBeVisible();
    await expect(productsPage.header.cartBadge).toHaveText('2');

    // add product3 to cart
    const product3 = productsPage.findProductByName('Sauce Labs Bolt T-Shirt');
    await expect(product3.removeButton).not.toBeVisible();
    await product3.addToCartButton.click();
    await expect(product3.addToCartButton).not.toBeVisible();
    await expect(product3.removeButton).toBeVisible();
    await expect(productsPage.header.cartBadge).toBeVisible();
    await expect(productsPage.header.cartBadge).toHaveText('3');

    await productsPage.header.cartButton.click();
    cartPage = new CartPage(page);
    expect((await cartPage.findAllCartProducts()).length).toBe(3);
    await expect(cartPage.header.cartBadge).toHaveText('3');

    // verify product1 in cart
    const expectedCartProduct1Data = products['Sauce Labs Backpack'];
    const cartProduct1 = cartPage.findCartProductByName(
      expectedCartProduct1Data.name,
    );
    await expect(cartProduct1.quantity).toBeVisible();
    await expect(cartProduct1.quantity).toHaveText('1');
    await expect(cartProduct1.name).toBeVisible();
    await expect(cartProduct1.name).toHaveText(expectedCartProduct1Data.name);
    await expect(cartProduct1.description).toBeVisible();
    await expect(cartProduct1.description).toHaveText(
      expectedCartProduct1Data.description,
    );
    await expect(cartProduct1.price).toBeVisible();
    await expect(cartProduct1.price).toHaveText(expectedCartProduct1Data.price);
    await expect(cartProduct1.removeButton).toBeVisible();

    // verify product2 in cart
    const expectedCartProduct2Data = products['Sauce Labs Bike Light'];
    const cartProduct2 = cartPage.findCartProductByName(
      expectedCartProduct2Data.name,
    );
    await expect(cartProduct2.quantity).toBeVisible();
    await expect(cartProduct2.quantity).toHaveText('1');
    await expect(cartProduct2.name).toBeVisible();
    await expect(cartProduct2.name).toHaveText(expectedCartProduct2Data.name);
    await expect(cartProduct2.description).toBeVisible();
    await expect(cartProduct2.description).toHaveText(
      expectedCartProduct2Data.description,
    );
    await expect(cartProduct2.price).toBeVisible();
    await expect(cartProduct2.price).toHaveText(expectedCartProduct2Data.price);
    await expect(cartProduct2.removeButton).toBeVisible();

    // verify product3 in cart
    const expectedCartProduct3Data = products['Sauce Labs Bolt T-Shirt'];
    const cartProduct3 = cartPage.findCartProductByName(
      expectedCartProduct3Data.name,
    );

    await expect(cartProduct3.quantity).toBeVisible();
    await expect(cartProduct3.quantity).toHaveText('1');
    await expect(cartProduct3.name).toBeVisible();
    await expect(cartProduct3.name).toHaveText(expectedCartProduct3Data.name);
    await expect(cartProduct3.description).toBeVisible();
    await expect(cartProduct3.description).toHaveText(
      expectedCartProduct3Data.description,
    );
    await expect(cartProduct3.price).toBeVisible();
    await expect(cartProduct3.price).toHaveText(expectedCartProduct3Data.price);
    await expect(cartProduct3.removeButton).toBeVisible();
  });
});
