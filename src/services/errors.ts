import { ProductId } from "../store/model";

export class UnknownProductError extends Error {
  constructor(productId: ProductId) {
    super(`Unknown product: ${productId}`);
  }
}

export class MissingRequiredProductError extends Error {
  product: string;
  requiredProductNames: string[];

  constructor(product: string, requiredProductNames: string[]) {
    super(`Product: ${product} cannot be selected without: ${requiredProductNames.join(", ")}.`);
    this.product = product;
    this.requiredProductNames = requiredProductNames;
  }
}
