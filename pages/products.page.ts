import { Page, Locator } from '@playwright/test';
import { NavBar } from '../components/navbar.component';
import { Product } from '../components/product.component';
import { Footer } from '../components/footer.component';

export class ProductsPage {
  private readonly page: Page;
  readonly navBar: NavBar;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.navBar = new NavBar(page);
    this.title = page.locator('#header_container .title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.footer = new Footer(page);
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

  async findAllProducts(): Promise<Product[]> {
    return (await this.page.getByTestId('inventory-item').all()).map(
      (productContainer) => new Product(productContainer),
    );
  }

  async getSelectedSortLabel(): Promise<string | null> {
    return this.sortDropdown.locator('option:checked').textContent();
  }
}
