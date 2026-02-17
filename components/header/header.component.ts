import { type Locator, type Page } from '@playwright/test';
import { NavBar } from './navbar.component';

export class Header {
  private readonly container: Locator;
  readonly navBar: NavBar;
  readonly title: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('header-container');
    this.navBar = new NavBar(this.container);
    this.title = this.container.locator('.header_label .app_logo');
    this.cartButton = this.container.getByTestId('shopping-cart-link');
    this.cartBadge = this.cartButton.getByTestId('shopping-cart-badge');
  }
}
