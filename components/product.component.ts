import { type Locator } from '@playwright/test';

export class Product {
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(container: Locator) {
    this.image = container.locator('img.inventory_item_img');
    this.name = container.getByTestId('inventory-item-name');
    this.description = container.getByTestId('inventory-item-desc');
    this.price = container.getByTestId('inventory-item-price');
    this.addToCartButton = container.getByRole('button', {
      name: 'Add to cart',
    });
    this.removeButton = container.getByRole('button', {
      name: 'Remove',
    });
  }
}
