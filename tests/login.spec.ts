import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Content of "Login" page is displayed correctly', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('page title "Swag Labs"', async ({ page }) => {
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('header "Swag Labs"', async () => {
    await expect(loginPage.header).toBeVisible();
    await expect(loginPage.header).toHaveText('Swag Labs');
  });

  test('username field is displayed correctly', async () => {
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.usernameField).toHaveAttribute(
      'placeholder',
      'Username',
    );
    await expect(loginPage.usernameField).toBeEmpty();
  });

  test('password field is displayed correctly', async () => {
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.passwordField).toHaveAttribute(
      'placeholder',
      'Password',
    );
    await expect(loginPage.passwordField).toBeEmpty();
  });

  test('login button is displayed correctly', async () => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveAttribute('value', 'Login');
    await expect(loginPage.loginButton).toBeEnabled();
  });
});
