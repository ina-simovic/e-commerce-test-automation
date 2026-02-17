import { Page, Locator } from '@playwright/test';
import { Header } from '../components/header/header.component';
import { Footer } from '../components/footer.component';

export class CartPage {
  private readonly page: Page;
  readonly header: Header;
  readonly title: Locator;
  readonly qtyLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.getByTestId('title');
    this.qtyLabel = page.getByTestId('cart-quantity-label');
    this.descriptionLabel = page.getByTestId('cart-desc-label');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
    this.footer = new Footer(page);
  }
}
