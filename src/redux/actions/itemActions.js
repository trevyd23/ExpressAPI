/* eslint-disable max-len */
import axios from 'axios'
import types from './types'

import { tokenValidation } from './UserActions'

export const fetchingItems = () => ({ type: types.ITEM_FETCHING })

export const errorItemAction = () => ({ type: types.ERROR_FETCHING, payload: false })

export const getItems = () => (dispatch) => {
  dispatch(fetchingItems())
  axios
    .get('/api/items')
    .then((res) => dispatch({ type: types.GET_ITEMS, payload: { items: res.data, fetching: false, errorMessage: '' } }))
    .catch((err) => dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err } }))
  return { type: types.GET_ITEMS }
}

export const addItem = (item = {}) => (dispatch, getState) => {
  dispatch(fetchingItems())
  axios
    .post('/api/items/create/item', item, tokenValidation(getState))
    .then((res) => dispatch({ type: types.ADD_ITEM, payload: res.data }))
    .catch((err) => dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err } }))
}

export const deleteItem = (id) => (dispatch, getState) => {
  dispatch(fetchingItems())
  axios
    .delete(`/api/items/${id}`, tokenValidation(getState))
    .then((res) => {
      dispatch({ type: types.DELETE_ITEM, payload: { id: res.data.itemID, fetching: false, errorMessage: '' } })
      // dispatch({ type: types.GET_ITEMS, payload: {  fetching: false, errorMessage: '' } })
    })
    .catch((err) => {
      dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err } })
    })

  return { type: types.DELETE_ITEM, payload: id }
}

export const updateItem = (id, updatedItem = {}) => (getState, dispatch) => {
  dispatch(fetchingItems())
  axios
    .put(`/api/items/${id}`, updatedItem, tokenValidation(getState))
    .then((res) => {
      dispatch({ type: types.UPDATE_ITEM, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err } })
    })
}
