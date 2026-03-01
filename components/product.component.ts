import { type Locator } from '@playwright/test';

export class Product {
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(productContainer: Locator) {
    this.image = productContainer.locator('img.inventory_item_img');
    this.name = productContainer.getByTestId('inventory-item-name');
    this.description = productContainer.getByTestId('inventory-item-desc');
    this.price = productContainer.getByTestId('inventory-item-price');
    this.addToCartButton = productContainer.getByRole('button', {
      name: 'Add to cart',
    });
    this.removeButton = productContainer.getByRole('button', {
      name: 'Remove',
    });
  }
}
