import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import users from '../data/users.json';

test.describe('Cart functionality', () => {
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

  test('header is displayed correctly', async ({ page }) => {
    await productsPage.header.cartButton.click();
    cartPage = new CartPage(page);

    await expect(cartPage.header.navBar.menuButton).toBeVisible();
    await expect(cartPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(cartPage.header.title).toBeVisible();
    await expect(cartPage.header.title).toHaveText('Swag Labs');
    await expect(cartPage.header.cartButton).toBeVisible();
    await expect(cartPage.header.cartBadge).not.toBeVisible();
  });

  test('empty cart is displayed correctly', async ({ page }) => {
    await productsPage.header.cartButton.click();
    cartPage = new CartPage(page);

    await expect(cartPage.title).toBeVisible();
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.qtyLabel).toBeVisible();
    await expect(cartPage.qtyLabel).toHaveText('QTY');
    await expect(cartPage.descriptionLabel).toBeVisible();
    await expect(cartPage.descriptionLabel).toHaveText('Description');
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.continueShoppingButton).toHaveText(
      'Continue Shopping',
    );
    expect((await cartPage.findAllCartProducts()).length).toBe(0);
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.checkoutButton).toHaveText('Checkout');
  });

  test('footer is displayed correctly', async ({ page }) => {
    await productsPage.header.cartButton.click();
    cartPage = new CartPage(page);

    await expect(cartPage.footer.twitterLink).toBeVisible();
    await expect(cartPage.footer.twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/saucelabs',
    );

    await expect(cartPage.footer.facebookLink).toBeVisible();
    await expect(cartPage.footer.facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs',
    );

    await expect(cartPage.footer.linkedinLink).toBeVisible();
    await expect(cartPage.footer.linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/',
    );

    await expect(cartPage.footer.copyright).toBeVisible();
    await expect(cartPage.footer.copyright).toHaveText(
      `© ${new Date().getFullYear()} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`,
    );
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
    const cartProduct1 = cartPage.findCartProductByName('Sauce Labs Backpack');
    await expect(cartProduct1.quantity).toBeVisible();
    await expect(cartProduct1.quantity).toHaveText('1');
    await expect(cartProduct1.name).toBeVisible();
    await expect(cartProduct1.name).toHaveText('Sauce Labs Backpack');
    await expect(cartProduct1.description).toBeVisible();
    await expect(cartProduct1.description).toHaveText(
      'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    );
    await expect(cartProduct1.price).toBeVisible();
    await expect(cartProduct1.price).toHaveText('$29.99');
    await expect(cartProduct1.removeButton).toBeVisible();

    // verify product2 in cart
    const cartProduct2 = cartPage.findCartProductByName(
      'Sauce Labs Bike Light',
    );
    await expect(cartProduct2.quantity).toBeVisible();
    await expect(cartProduct2.quantity).toHaveText('1');
    await expect(cartProduct2.name).toBeVisible();
    await expect(cartProduct2.name).toHaveText('Sauce Labs Bike Light');
    await expect(cartProduct2.description).toBeVisible();
    await expect(cartProduct2.description).toHaveText(
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    );
    await expect(cartProduct2.price).toBeVisible();
    await expect(cartProduct2.price).toHaveText('$9.99');
    await expect(cartProduct2.removeButton).toBeVisible();

    // verify product3 in cart
    const cartProduct3 = cartPage.findCartProductByName(
      'Sauce Labs Bolt T-Shirt',
    );
    await expect(cartProduct3.quantity).toBeVisible();
    await expect(cartProduct3.quantity).toHaveText('1');
    await expect(cartProduct3.name).toBeVisible();
    await expect(cartProduct3.name).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(cartProduct3.description).toBeVisible();
    await expect(cartProduct3.description).toHaveText(
      'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    );
    await expect(cartProduct3.price).toBeVisible();
    await expect(cartProduct3.price).toHaveText('$15.99');
    await expect(cartProduct3.removeButton).toBeVisible();
  });
});
