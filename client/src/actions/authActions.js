import axios from 'axios';
import { retunErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from './types';

const headers = {
  headers: {
    'Content-type': 'application/json',
  },
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localStorage
  const { auth: { token } } = getState();

  // Headers
  const config = headers;

  if (token) config.headers['x-auth-token'] = token;

  return config;
};

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get('/api/auth/users', tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch(retunErrors(error.response.data, error.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  // Request body
  const body = JSON.stringify({ name, email, password });

  try {
    const { data } = await axios.post('/api/users', body, headers);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch(retunErrors(error.response.data, error.response.status, REGISTER_FAIL));
    dispatch({ type: REGISTER_FAIL });
  }
};

// Logout User
export const logout = () => ({
  type: LOGOUT_SUCCESS,
});
