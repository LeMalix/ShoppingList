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

const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then((res) => dispatch({
      type: GET_ITEMS,
      payload: res.data,
    }));
};

const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then(() => dispatch({
      type: DELETE_ITEMS,
      payload: id,
    }));
};

const addItem = (item) => (dispatch) => {
  axios
    .post('/api/items', item)
    .then((res) => dispatch({
      type: ADD_ITEM,
      payload: res.data,
    }));
};

export {
  getItems,
  deleteItem,
  addItem,
  setItemsLoading,
};
