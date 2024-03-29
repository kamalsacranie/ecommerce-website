import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { 
  ORDER_LIST_MY_RESET,
 } from '../constants/orderConstants'
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { "username": email, "password": password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({type: USER_LIST_RESET})
  dispatch({type: ORDER_LIST_MY_RESET})
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register/",
      {
        "name": name,
        "email": email,
        "password": password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { 
      userLogin: { userInfo }
     } = getState()

     console.log(userInfo)
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    const { data } = await axios.get(
      `/api/users/${id}/`, // To see the explanation for this look at 6. Profile screen & get user details at 5:30
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {

  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config,
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS, // 'dispathcing' i.e. triggering to login once the profile update is done
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data)); //updating our local storage

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {

  try {
    dispatch({
      type: USER_LIST_REQUEST,
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

    const { data } = await axios.get(
      `/api/users/`,
      config,
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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

    const { data } = await axios.delete(
      `/api/users/delete/${id}/`,
      config,
    );

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {

  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
      `/api/users/update/${user._id}/`,
      user,
      config,
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    // We also want to trigger our user details success and send the up-
    // dated form information to is
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};