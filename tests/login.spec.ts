import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('page title "Swag Labs"', async ({ page }) => {
  await expect(page).toHaveTitle('Swag Labs');
});

test('header "Swag Labs"', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.header).toBeVisible();
  await expect(loginPage.header).toHaveText('Swag Labs');
});

test('username field is displayed correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.usernameField).toBeVisible();
  await expect(loginPage.usernameField).toHaveAttribute(
    'placeholder',
    'Username',
  );
  await expect(loginPage.usernameField).toHaveValue('');
});

test('password field is displayed correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.passwordField).toBeVisible();
  await expect(loginPage.passwordField).toHaveAttribute(
    'placeholder',
    'Password',
  );
  await expect(loginPage.passwordField).toHaveValue('');
});

test('login button is displayed correctly', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toHaveAttribute('value', 'Login');
  await expect(loginPage.loginButton).not.toHaveAttribute('disabled');
});

test('valid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logInWith({
    username: 'standard_user',
    password: 'secret_sauce',
  });
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});
