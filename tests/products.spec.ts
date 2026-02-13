import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

test.describe('Product functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  const expectedProductNamesWithPrices = {
    'Sauce Labs Backpack': '$29.99',
    'Sauce Labs Bike Light': '$9.99',
    'Sauce Labs Bolt T-Shirt': '$15.99',
    'Sauce Labs Fleece Jacket': '$49.99',
    'Sauce Labs Onesie': '$7.99',
    'Test.allTheThings() T-Shirt (Red)': '$15.99',
  };

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

  test('header is displayed correctly', async () => {
    await expect(productsPage.header.navBar.menuButton).toBeVisible();
    await expect(productsPage.header.navBar.aboutLink).not.toBeVisible();
    await expect(productsPage.header.title).toBeVisible();
    await expect(productsPage.header.title).toHaveText('Swag Labs');
    await expect(productsPage.header.cartButton).toBeVisible();
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

  test('product sort by - name ASC - default', async () => {
    await expect(productsPage.sortDropdown).toBeVisible();
    await expect(productsPage.sortDropdown).toHaveValue('az');
    await expect(
      productsPage.sortDropdown.locator('option:checked'),
    ).toHaveText('Name (A to Z)');

    const allProducts = await productsPage.findAllProducts();
    const actualProductNames = await Promise.all(
      allProducts.map((product) => product.name.textContent()),
    );
    expect(actualProductNames).toEqual(
      Object.keys(expectedProductNamesWithPrices).toSorted((a, b) =>
        a.localeCompare(b),
      ),
    );
  });

  test('product sort by - name DSC', async () => {
    await productsPage.sortDropdown.selectOption('Name (Z to A)');
    await expect(productsPage.sortDropdown).toBeVisible();
    await expect(productsPage.sortDropdown).toHaveValue('za');
    await expect(
      productsPage.sortDropdown.locator('option:checked'),
    ).toHaveText('Name (Z to A)');

    const allProducts = await productsPage.findAllProducts();
    const actualProductNames = await Promise.all(
      allProducts.map((product) => product.name.textContent()),
    );
    expect(actualProductNames).toEqual(
      Object.keys(expectedProductNamesWithPrices).toSorted((a, b) =>
        b.localeCompare(a),
      ),
    );
  });

  test('product sort by - price ASC', async () => {
    await productsPage.sortDropdown.selectOption('Price (low to high)');
    await expect(productsPage.sortDropdown).toBeVisible();
    await expect(productsPage.sortDropdown).toHaveValue('lohi');
    await expect(
      productsPage.sortDropdown.locator('option:checked'),
    ).toHaveText('Price (low to high)');

    // actual
    const allProducts = await productsPage.findAllProducts();
    const actualProductPrices = await Promise.all(
      allProducts.map((product) => product.price.textContent()),
    );
    const actualProductPricesAsNumbers = actualProductPrices.map((price) =>
      Number(price?.replace('$', '')),
    );

    // expected
    const expectedProductPricesAsNumbers = Object.values(
      expectedProductNamesWithPrices,
    ).map((price) => Number(price.replace('$', '')));

    expect(actualProductPricesAsNumbers).toEqual(
      expectedProductPricesAsNumbers.toSorted((a, b) => a - b),
    );
  });

  test('product sort by - price DSC', async () => {
    await productsPage.sortDropdown.selectOption('Price (high to low)');
    await expect(productsPage.sortDropdown).toBeVisible();
    await expect(productsPage.sortDropdown).toHaveValue('hilo');
    await expect(
      productsPage.sortDropdown.locator('option:checked'),
    ).toHaveText('Price (high to low)');

    // actual
    const allProducts = await productsPage.findAllProducts();
    const actualProductPrices = await Promise.all(
      allProducts.map((product) => product.price.textContent()),
    );
    const actualProductPricesAsNumbers = actualProductPrices.map((price) =>
      Number(price?.replace('$', '')),
    );

    // expected
    const expectedProductPricesAsNumbers = Object.values(
      expectedProductNamesWithPrices,
    ).map((price) => Number(price.replace('$', '')));

    expect(actualProductPricesAsNumbers).toEqual(
      expectedProductPricesAsNumbers.toSorted((a, b) => b - a),
    );
  });

  test('footer is displayed correctly', async () => {
    await expect(productsPage.footer.twitterLink).toBeVisible();
    await expect(productsPage.footer.twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/saucelabs',
    );

    await expect(productsPage.footer.facebookLink).toBeVisible();
    await expect(productsPage.footer.facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/saucelabs',
    );

    await expect(productsPage.footer.linkedinLink).toBeVisible();
    await expect(productsPage.footer.linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/sauce-labs/',
    );

    await expect(productsPage.footer.copyright).toBeVisible();
    await expect(productsPage.footer.copyright).toHaveText(
      `© ${new Date().getFullYear()} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`,
    );
  });
});
