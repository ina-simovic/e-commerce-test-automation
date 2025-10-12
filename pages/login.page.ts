import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly header: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('div.login_logo', { hasText: 'Swag Labs' });
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async setUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async logInWith(options: { username: string; password: string }) {
    await this.usernameField.fill(options.username);
    await this.passwordField.fill(options.password);
    await this.loginButton.click();
  }
}
