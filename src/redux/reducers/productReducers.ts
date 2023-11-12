import { productsActions } from "../actions";

type Action = {
  type: string;
  payload: any;
};

const initialState = {
  products: [],
  combinedProducts: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case productsActions.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case productsActions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        combinedProducts: [...state.combinedProducts, ...action.payload],
        error: null,
      };
    case productsActions.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { productReducer };
