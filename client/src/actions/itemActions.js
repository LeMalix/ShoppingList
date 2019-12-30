import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from './types';

const getItems = () => ({
  type: GET_ITEMS,
});

const deleteItem = (id) => ({
  type: DELETE_ITEMS,
  payload: id,
});

const addItem = (item) => ({
  type: ADD_ITEMS,
  payload: item,
});

export { getItems, deleteItem, addItem };
