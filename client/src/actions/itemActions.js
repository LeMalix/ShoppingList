import axios from 'axios';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEMS,
  ITEMS_LOADING,
} from './types';
import { tokenConfig } from './authActions';
import { retunErrors } from './errorActions';

const setItemsLoading = () => ({
  type: ITEMS_LOADING,
});

const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    const res = await axios.get('/api/items');
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(retunErrors(error.response.data, error.response.status));
  }
};

const deleteItem = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/items/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_ITEMS,
      payload: id,
    });
  } catch (error) {
    dispatch(retunErrors(error.response.data, error.response.status));
  }
};

const addItem = (item) => async (dispatch, getState) => {
  try {
    const res = await axios.post('/api/items', item, tokenConfig(getState));
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch(retunErrors(error.response.data, error.response.status));
  }
};

export {
  getItems,
  deleteItem,
  addItem,
  setItemsLoading,
};
