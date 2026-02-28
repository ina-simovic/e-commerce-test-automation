import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import users from '../../data/users.json';

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
});
