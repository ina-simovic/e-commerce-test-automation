import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import users from '../data/users.json';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('Checkout functionality @checkout', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);

    await loginPage.login({
      username: users.standard.username,
      password: users.standard.password,
    });

    await expect(page).toHaveURL('/inventory.html');
    productsPage = new ProductsPage(page);

    const product = productsPage.findProductByName('Sauce Labs Backpack');
    await product.addToCartButton.click();

    await productsPage.header.cartButton.click();
    cartPage = new CartPage(page);
    await cartPage.checkoutButton.click();
    checkoutPage = new CheckoutPage(page);
  });

  test('header is displayed correctly', async () => {
    await expect(checkoutPage.header.navBar.menuButton).toBeVisible();
    await expect(checkoutPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(checkoutPage.header.title).toBeVisible();
    await expect(checkoutPage.header.title).toHaveText('Swag Labs');
    await expect(checkoutPage.header.cartButton).toBeVisible();
    await expect(checkoutPage.header.cartBadge).toHaveText('1');
  });

  test('checkout page is displayed correctly', async () => {
    await expect(checkoutPage.title).toBeVisible();
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');

    await expect(checkoutPage.firstNameField).toBeVisible();
    await expect(checkoutPage.firstNameField).toHaveAttribute(
      'placeholder',
      'First Name',
    );

    await expect(checkoutPage.lastNameField).toBeVisible();
    await expect(checkoutPage.lastNameField).toHaveAttribute(
      'placeholder',
      'Last Name',
    );

    await expect(checkoutPage.zipCodeField).toBeVisible();
    await expect(checkoutPage.zipCodeField).toHaveAttribute(
      'placeholder',
      'Zip/Postal Code',
    );

    await expect(checkoutPage.cancelButton).toBeVisible();
    await expect(checkoutPage.continueButton).toBeVisible();
  });

  test('footer is displayed correctly', async () => {
    await expect(checkoutPage.footer.twitterLink).toBeVisible();
    await expect(checkoutPage.footer.twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/saucelabs',
    );

    await expect(checkoutPage.footer.facebookLink).toBeVisible();
    await expect(checkoutPage.footer.facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs',
    );

    await expect(checkoutPage.footer.linkedinLink).toBeVisible();
    await expect(checkoutPage.footer.linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/',
    );

    await expect(checkoutPage.footer.copyright).toBeVisible();
    await expect(checkoutPage.footer.copyright).toHaveText(
      `© ${new Date().getFullYear()} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`,
    );
  });
});
