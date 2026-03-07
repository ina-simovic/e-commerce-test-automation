import { Page, Locator, expect } from '@playwright/test';
import { Header } from '../components/header/header.component';
import { Product } from '../components/product.component';
import { Footer } from '../components/footer.component';

export class ProductsPage {
  private readonly page: Page;
  readonly header: Header;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.locator('#header_container .title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.footer = new Footer(page);
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL('/inventory.html');
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
}
