import { type Locator, type Page } from '@playwright/test';

export class NavBar {
  readonly menuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly closeMenuButton: Locator;

  constructor(container: Locator) {
    this.menuButton = container.locator('#react-burger-menu-btn');
    this.allItemsLink = container.getByTestId('inventory-sidebar-link');
    this.aboutLink = container.getByTestId('about-sidebar-link');
    this.logoutLink = container.getByTestId('logout-sidebar-link');
    this.closeMenuButton = container.locator('#react-burger-cross-btn');
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
