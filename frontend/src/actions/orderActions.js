import axios from 'axios'
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'


export const createOrder = (order) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { 
      userLogin: { userInfo } // here, along with the other ones, because we need to be logged in
      // we get our userInfo from our state using getState because we have a state called user info
      // Which contains login etc. We destructure the return value from the getState function.
     } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // grabbing our token from userInfo and allowing us to authorise
      },
    };

    const { data } = await axios.post(
      `/api/orders/add/`,
      order,
      config,
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    localStorage.removeItem('cartItems') // this removes the items from local storage but! we still have to clear them from our state to properly clear our cart

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// I should really change this name to getOrderDetails
export const createOrderDetails = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { 
      userLogin: { userInfo }
     } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // grabbing our token from userInfo and allowing us to authorise
      },
    };

    const { data } = await axios.get(
      `/api/orders/${id}/`,
      config,
    );
    console.log(data)
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const { 
      userLogin: { userInfo }
     } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // grabbing our token from userInfo and allowing us to authorise
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config,
    );
    console.log(data)
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMyOrders = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const { 
      userLogin: { userInfo }
     } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // grabbing our token from userInfo and allowing us to authorise
      },
    };

    const { data } = await axios.get(
      `/api/orders/myorders/`,
      config,
    );

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listOrders = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const { 
      userLogin: { userInfo }
     } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` // grabbing our token from userInfo and allowing us to authorise
      },
    };

    const { data } = await axios.get(
      `/api/orders/`,
      config,
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};