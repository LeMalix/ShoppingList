import axios from 'axios';
import { retunErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // LOGOUT_SUCCESS,
  // REGISTER_SUCCESS,
  // REGISTER_FAIL
} from './types';

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localStorage
  const { auth: { token } } = getState();

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

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
