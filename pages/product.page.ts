import { Page, Locator } from '@playwright/test';
import { NavBar } from '../components/navbar.component';

export class ProductPage {
  private readonly page: Page;
  readonly navBar: NavBar;
  readonly backToProductsButton: Locator;
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBar = new NavBar(page);
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.image = page.locator('.inventory_details_img');
    this.name = page.getByTestId('inventory-item-name');
    this.description = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
  }
}
