import axios from 'axios';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEMS,
  ITEMS_LOADING,
} from './types';

const setItemsLoading = () => ({
  type: ITEMS_LOADING,
});

const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  const res = await axios.get('/api/items');
  dispatch({
    type: GET_ITEMS,
    payload: res.data,
  });
};

const deleteItem = (id) => async (dispatch) => {
  await axios.delete(`/api/items/${id}`);
  dispatch({
    type: DELETE_ITEMS,
    payload: id,
  });
};

const addItem = (item) => async (dispatch) => {
  const res = await axios.post('/api/items', item);
  dispatch({
    type: ADD_ITEM,
    payload: res.data,
  });
};

export {
  getItems,
  deleteItem,
  addItem,
  setItemsLoading,
};
