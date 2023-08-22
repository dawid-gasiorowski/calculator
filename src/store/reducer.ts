import { Actions, ActionTypes } from "./actions";
import { State } from "./state";

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_PRODUCT_DATA:
      return {
        ...state,
        productData: action.payload.productData,
      };
    case ActionTypes.SET_SELECTED_PRODUCTS:
      return {
        ...state,
        calucaltorFormData: {
          ...state.calucaltorFormData,
          selectedProducts: action.payload.selectedProducts,
        },
      };
    case ActionTypes.SET_SELECTED_YEAR:
      return {
        ...state,
        calucaltorFormData: {
          ...state.calucaltorFormData,
          selectedYear: action.payload.selectedYear,
        },
      };
    case ActionTypes.SET_VALIDATION_PRODUCT_RESULT:
      return {
        ...state,
        validationResult: action.payload.validationResult,
      };
    case ActionTypes.SET_PREPARED_OFFER:
      return {
        ...state,
        preparedOffer: action.payload.offer,
      };
    default:
      throw new Error("Unknow action type");
  }
}

export default reducer;
