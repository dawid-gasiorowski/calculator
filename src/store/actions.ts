import { SelectOption } from "../components/ui/Select";
import { ProductsValidationResult } from "../services/offerCalculatorValidation";
import { Offer, ProductData } from "./model";

export enum ActionTypes {
  SET_PRODUCT_DATA = "SET_PRODUCT_DATA",
  SET_SELECTED_PRODUCTS = "SET_SELECTED_PRODUCTS",
  SET_SELECTED_YEAR = "SET_SELECTED_YEAR",
  SET_VALIDATION_PRODUCT_RESULT = "SET_VALIDATION_PRODUCT_RESULT",
  SET_PREPARED_OFFER = "SET_PREPARED_OFFER",
}

interface SetProductDataPayload {
  productData: ProductData;
}

interface SetSelectedProductPayload {
  selectedProducts: string[];
}

interface SetSelectedYearPayload {
  selectedYear: SelectOption;
}

interface SetValidationProductResultPayload {
  validationResult: ProductsValidationResult;
}

interface SetPreparedOfferPayload {
  offer: Offer;
}

export type Actions =
  | { type: ActionTypes.SET_PRODUCT_DATA; payload: SetProductDataPayload }
  | { type: ActionTypes.SET_SELECTED_PRODUCTS; payload: SetSelectedProductPayload }
  | { type: ActionTypes.SET_SELECTED_YEAR; payload: SetSelectedYearPayload }
  | { type: ActionTypes.SET_VALIDATION_PRODUCT_RESULT; payload: SetValidationProductResultPayload }
  | { type: ActionTypes.SET_PREPARED_OFFER; payload: SetPreparedOfferPayload };
