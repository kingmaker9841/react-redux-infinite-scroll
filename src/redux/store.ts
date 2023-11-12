import { applyMiddleware, combineReducers, createStore } from "redux";

import { productReducers } from "./reducers";
import thunk from "redux-thunk";

const middlewares = applyMiddleware(thunk);
const rootReducer = combineReducers({
  products: productReducers.productReducer,
});

export const store = createStore(rootReducer, middlewares);
