import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { ProductPage } from '../pages/product.page';

test.describe('Product functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let productPage: ProductPage;

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

  test('header is displayed correctly', async ({ page }) => {
    const product = productsPage.findProductByName('Sauce Labs Bike Light');
    await product.name.click();

    productPage = new ProductPage(page);
    await expect(productPage.header.navBar.menuButton).toBeVisible();
    await expect(productPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(productPage.header.title).toBeVisible();
    await expect(productPage.header.title).toHaveText('Swag Labs');
    await expect(productPage.header.cartButton).toBeVisible();
  });

  test('product is displayed correctly', async ({ page }) => {
    const expectedProductDetails = {
      name: 'Sauce Labs Bike Light',
      description:
        "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
      price: '$9.99',
    };

    const product = productsPage.findProductByName(expectedProductDetails.name);
    await product.name.click();

    productPage = new ProductPage(page);
    expect(productPage.backToProductsButton).toBeVisible();
    expect(productPage.backToProductsButton).toHaveText('Back to products');
    expect(productPage.image).toBeVisible();
    expect(productPage.name).toBeVisible();
    expect(productPage.name).toHaveText(expectedProductDetails.name);
    expect(productPage.description).toBeVisible();
    expect(productPage.description).toHaveText(
      expectedProductDetails.description,
    );
    expect(productPage.price).toBeVisible();
    expect(productPage.price).toHaveText(expectedProductDetails.price);
    expect(productPage.addToCartButton).toBeVisible();
    expect(productPage.addToCartButton).toHaveText('Add to cart');
  });

  test('footer is displayed correctly', async ({ page }) => {
    const product = productsPage.findProductByName('Sauce Labs Bike Light');
    await product.name.click();

    productPage = new ProductPage(page);
    await expect(productPage.footer.twitterLink).toBeVisible();
    await expect(productPage.footer.twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/saucelabs',
    );

    await expect(productPage.footer.facebookLink).toBeVisible();
    await expect(productPage.footer.facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs',
    );

    await expect(productPage.footer.linkedinLink).toBeVisible();
    await expect(productPage.footer.linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/',
    );

    await expect(productPage.footer.copyright).toBeVisible();
    await expect(productPage.footer.copyright).toHaveText(
      `© ${new Date().getFullYear()} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`,
    );
  });
});
