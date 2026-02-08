import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  readonly header: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly closeErrorMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.login_logo');
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.closeErrorMessageButton = page.locator('[data-test="error-button"]');
  }

  async setUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  async setPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async login(options: { username: string; password: string }) {
    await this.setUsername(options.username);
    await this.setPassword(options.password);
    await this.loginButton.click();
  }
}
