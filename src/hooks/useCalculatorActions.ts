import { useContext } from "react";
import { SelectOption } from "../components/ui/Select";

import { CalculatorDispatchContext } from "../contexts/CalculatorDispatchContext";
import { ProductsValidationResult } from "../services/offerCalculatorValidation";
import { ActionTypes } from "../store/actions";
import { Offer, ProductData } from "../store/model";

function useCalculatorActions() {
  const dispatch = useContext(CalculatorDispatchContext);

  const setProductData = (productData: ProductData) =>
    dispatch({
      type: ActionTypes.SET_PRODUCT_DATA,
      payload: {
        productData,
      },
    });

  const setSelectedProducts = (selectedProducts: string[]) =>
    dispatch({
      type: ActionTypes.SET_SELECTED_PRODUCTS,
      payload: {
        selectedProducts,
      },
    });

  const setSelectedYear = (selectedYear: SelectOption) =>
    dispatch({
      type: ActionTypes.SET_SELECTED_YEAR,
      payload: {
        selectedYear,
      },
    });

  const setValidationProductResult = (validationResult: ProductsValidationResult) =>
    dispatch({
      type: ActionTypes.SET_VALIDATION_PRODUCT_RESULT,
      payload: {
        validationResult,
      },
    });

  const setPreparedOffer = (offer: Offer) =>
    dispatch({
      type: ActionTypes.SET_PREPARED_OFFER,
      payload: {
        offer,
      },
    });

  return { setProductData, setSelectedProducts, setSelectedYear, setValidationProductResult, setPreparedOffer };
}

export default useCalculatorActions;
