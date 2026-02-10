import { Page, Locator } from '@playwright/test';
import { NavBar } from '../components/navbar.component';
import { Product } from '../components/Product.component';

export class ProductsPage {
  private readonly page: Page;
  readonly navBar: NavBar;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBar = new NavBar(page);
    this.title = page.locator('#header_container .title');
  }

  findProductByName(name: string): Product {
    const productContainer = this.page.getByTestId('inventory-item').filter({
      has: this.page
        .getByTestId('inventory-item-name')
        .filter({ hasText: name }),
    });

    return new Product(productContainer);
  }

  findProductByPrice(price: string): Product {
    const productContainer = this.page.getByTestId('inventory-item').filter({
      has: this.page
        .getByTestId('inventory-item-price')
        .filter({ hasText: price }),
    });

    return new Product(productContainer);
  }
}
