import { type Locator } from '@playwright/test';

export class CartProduct {
  readonly quantity: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly removeButton: Locator;

  constructor(container: Locator) {
    this.quantity = container.getByTestId('item-quantity');
    this.name = container.getByTestId('inventory-item-name');
    this.description = container.getByTestId('inventory-item-desc');
    this.price = container.getByTestId('inventory-item-price');
    this.removeButton = container.getByRole('button', {
      name: 'Remove',
    });
  }
}
