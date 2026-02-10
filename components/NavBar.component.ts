import { type Locator, type Page } from '@playwright/test';

export class NavBar {
  private readonly container: Locator;
  readonly menuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.container = page.locator('#menu_button_container');
    this.menuButton = this.container.locator('#react-burger-menu-btn');
    this.allItemsLink = this.container.getByTestId('inventory-sidebar-link');
    this.aboutLink = this.container.getByTestId('about-sidebar-link');
    this.logoutLink = this.container.getByTestId('logout-sidebar-link');
    this.closeMenuButton = this.container.locator('#react-burger-cross-btn');
  }

  async open(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.open();
    await this.logoutLink.click();
  }

  async close(): Promise<void> {
    if (await this.closeMenuButton.isVisible()) {
      await this.closeMenuButton.click();
    }
  }
}
