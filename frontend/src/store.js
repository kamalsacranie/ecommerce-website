import { createStore, combineReducers, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetialsReducer,
} from "./reducers/productReducers";
import { userLoginReducer } from "./reducers/userReducer";
import { userRegisterReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetialsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
