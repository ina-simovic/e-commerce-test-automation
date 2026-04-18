import { expect, type Locator, type Page } from '@playwright/test';
import { Header } from '../components/header/header.component';
import { Footer } from '../components/footer.component';

export class CheckoutPage {
  private readonly page: Page;
  readonly header: Header;
  readonly title: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly zipCodeField: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly closeErrorMessageButton: Locator;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.title = page.getByTestId('title');
    this.firstNameField = page.getByTestId('firstName');
    this.lastNameField = page.getByTestId('lastName');
    this.zipCodeField = page.getByTestId('postalCode');
    this.cancelButton = page.getByTestId('cancel');
    this.continueButton = page.getByTestId('continue');
    this.errorMessage = page.getByTestId('error');
    this.closeErrorMessageButton = page.getByTestId('error-button');
    this.footer = new Footer(page);
  }

  async shouldBeDisplayed(): Promise<void> {
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }

  async setFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }

  async setLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  async setZipCode(zipCode: string): Promise<void> {
    await this.zipCodeField.fill(zipCode);
  }

  async checkout(options: {
    firstName: string;
    lastName: string;
    zipCode: string;
  }) {
    await this.setFirstName(options.firstName);
    await this.setLastName(options.lastName);
    await this.setZipCode(options.zipCode);
    await this.continueButton.click();
  }
}
