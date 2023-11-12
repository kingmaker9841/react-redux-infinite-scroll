import { Dispatch } from "redux";
import { productsActions } from "../actions";

type FetchProducts = {
  limit: number;
  skip: number;
  signal: AbortSignal;
  callbackSuccess?: () => void;
  callbackError?: () => void;
};

const fetchProducts =
  ({ limit, skip, signal, callbackSuccess, callbackError }: FetchProducts) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: productsActions.FETCH_PRODUCTS_REQUEST });
    try {
      const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      const response = await fetch(url, { signal });
      const data = await response.json();
      dispatch({
        type: productsActions.FETCH_PRODUCTS_SUCCESS,
        payload: data.products,
      });
      callbackSuccess?.();
    } catch (err) {
      callbackError?.();
      dispatch({ type: productsActions.FETCH_PRODUCTS_FAILURE, payload: err });
    }
  };

export { fetchProducts };
