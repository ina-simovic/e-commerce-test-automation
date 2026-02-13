import { Page, type Locator } from '@playwright/test';

export class Footer {
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.twitterLink = page.getByTestId('social-twitter');
    this.facebookLink = page.getByTestId('social-facebook');
    this.linkedinLink = page.getByTestId('social-linkedin');
    this.copyright = page.getByTestId('footer-copy');
  }
}
