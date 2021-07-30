// A reducer is a function that takes in our current state and
// it takes in an action of what we want to do to this state. depending
// on what the action type is we just manipulate the state. The state is
// like a group of things all things on your website have access to?
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
} from '../constants/productConstants'


export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetialsReducer = (state = { product: {reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {  }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {  }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { 
        loading: false, 
        success: true, 
        product: action.payload
      };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return { loading: false };

    default:
      return state;
  }
};