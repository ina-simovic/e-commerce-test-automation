import { Page, Locator } from '@playwright/test';
import { Header } from '../components/header/header.component';
import { Footer } from '../components/footer.component';

export class ProductPage {
  private readonly page: Page;
  readonly header: Header;
  readonly backToProductsButton: Locator;
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.backToProductsButton = page.getByTestId('back-to-products');
    this.image = page.locator('.inventory_details_img');
    this.name = page.getByTestId('inventory-item-name');
    this.description = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.removeButton = page.getByTestId('remove');
    this.footer = new Footer(page);
  }
}
