import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import users from '../../data/users.json';
import { ProductPage } from '../../pages/product.page';
import products from '../../data/products.json';
import { CartPage } from '../../pages/cart.page';

test.describe('Cart functionality @cart', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productPage: ProductPage;
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
    await expect(productsPage.header.cartBadge).not.toBeVisible();
  });

  test('single product can be added and removed from cart', async ({
    page,
  }) => {
    const expectedProductData = products['Sauce Labs Backpack'];
    const product = productsPage.findProductByName(expectedProductData.name);
    await product.name.click();
    await expect(product.removeButton).not.toBeVisible();

    productPage = new ProductPage(page);
    await productPage.addToCartButton.click();

    await expect(productPage.addToCartButton).not.toBeVisible();
    await expect(productPage.removeButton).toBeVisible();
    await expect(productPage.removeButton).toHaveText('Remove');
    await expect(productPage.header.cartBadge).toBeVisible();
    await expect(productPage.header.cartBadge).toHaveText('1');
    await expect(productPage.name).toBeVisible();
    await expect(productPage.name).toHaveText(expectedProductData.name);
    await expect(productPage.description).toBeVisible();
    await expect(productPage.description).toHaveText(
      expectedProductData.description,
    );
    await expect(productPage.price).toBeVisible();
    await expect(productPage.price).toHaveText(expectedProductData.price);
    await expect(productPage.image).toBeVisible();

    await productPage.removeButton.click();
    await expect(productPage.removeButton).not.toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toHaveText('Add to cart');
    await expect(productPage.header.cartBadge).not.toBeVisible();
    await expect(productPage.name).toBeVisible();
    await expect(productPage.name).toHaveText(expectedProductData.name);
    await expect(productPage.description).toBeVisible();
    await expect(productPage.description).toHaveText(
      expectedProductData.description,
    );
    await expect(productPage.price).toBeVisible();
    await expect(productPage.price).toHaveText(expectedProductData.price);
    await expect(productPage.image).toBeVisible();
  });

  test('single product is displayed correctly in cart', async ({ page }) => {
    const expectedProductData = products['Sauce Labs Bike Light'];
    const product = productsPage.findProductByName(expectedProductData.name);
    await product.name.click();
    await expect(product.removeButton).not.toBeVisible();

    productPage = new ProductPage(page);
    await productPage.addToCartButton.click();
    await productPage.header.cartButton.click();

    cartPage = new CartPage(page);

    // header
    await expect(cartPage.header.navBar.menuButton).toBeVisible();
    await expect(cartPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(cartPage.header.title).toBeVisible();
    await expect(cartPage.header.title).toHaveText('Swag Labs');
    await expect(cartPage.header.cartButton).toBeVisible();
    await expect(cartPage.header.cartBadge).toHaveText('1');

    // main
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
    expect((await cartPage.findAllCartProducts()).length).toBe(1);
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.checkoutButton).toHaveText('Checkout');

    // expected product
    const cartProduct = cartPage.findCartProductByName(
      expectedProductData.name,
    );
    await expect(cartProduct.quantity).toBeVisible();
    await expect(cartProduct.quantity).toHaveText('1');
    await expect(cartProduct.name).toBeVisible();
    await expect(cartProduct.name).toHaveText(expectedProductData.name);
    await expect(cartProduct.description).toBeVisible();
    await expect(cartProduct.description).toHaveText(
      expectedProductData.description,
    );
    await expect(cartProduct.price).toBeVisible();
    await expect(cartProduct.price).toHaveText(expectedProductData.price);
    await expect(cartProduct.removeButton).toBeVisible();
    await expect(cartProduct.removeButton).toHaveText('Remove');

    // footer
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
});
