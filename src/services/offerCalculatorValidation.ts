import { ProductData, ProductId } from "../store/model";
import { MissingRequiredProductError, UnknownProductError } from "./errors";
import { getMissingRequiredProducts, getProductById, getProductNames } from "./offerCalculator";

export interface ProductValidationResult {
  productId: ProductId;
  success: boolean;
  message?: string;
}

export interface ProductsValidationResult {
  validationResults: ProductValidationResult[];
  hasAnyError: boolean;
}

export function validateRequestedProduct(db: ProductData, requestedProducts: ProductId[]): ProductsValidationResult {
  const validationResults: ProductValidationResult[] = [];
  let hasAnyError = false;

  for (const productId of requestedProducts) {
    try {
      const requestedProduct = getProductById(db, productId);
      const missingRequiredProduct = getMissingRequiredProducts(requestedProduct, requestedProducts);

      if (missingRequiredProduct.length > 0) {
        throw new MissingRequiredProductError(requestedProduct.name, getProductNames(db, missingRequiredProduct));
      }

      validationResults.push({ productId, success: true });
    } catch (error) {
      let errorMessage = "Produkt jest nieprawidłowy.";

      if (error instanceof UnknownProductError) {
        errorMessage = error.message;
      } else if (error instanceof MissingRequiredProductError) {
        errorMessage = `Produkt ${error.product} nie może być wybrany bez: ${error.requiredProductNames}.`;
      }

      validationResults.push({ productId, success: false, message: errorMessage });
      hasAnyError = true;
    }
  }

  return { validationResults, hasAnyError };
}
