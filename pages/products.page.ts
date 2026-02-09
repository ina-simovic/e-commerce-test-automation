import { Page, Locator } from '@playwright/test';
import { NavBar } from '../components/NavBar.component';

export class ProductsPage {
  private readonly page: Page;
  readonly navBar: NavBar;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBar = new NavBar(page);
    this.title = page.locator('#header_container .title');
  }
}
