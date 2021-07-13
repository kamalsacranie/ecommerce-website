import { createStore, combineReducers, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetialsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetialsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
