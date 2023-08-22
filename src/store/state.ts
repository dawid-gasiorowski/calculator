import { ProductsValidationResult } from "../services/offerCalculatorValidation";
import { CalculatorFormData, Offer, ProductData } from "./model";

export interface State {
  productData: ProductData;
  calucaltorFormData: CalculatorFormData;
  validationResult: ProductsValidationResult;
  preparedOffer?: Offer;
}

const initialState: State = {
  productData: {
    availableYears: [],
    products: [],
    productBundles: [],
  },
  calucaltorFormData: {
    selectedYear: undefined,
    selectedProducts: [],
  },
  validationResult: {
    validationResults: [],
    hasAnyError: false,
  },
  preparedOffer: undefined,
};

export { initialState };
