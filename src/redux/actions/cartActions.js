/* eslint-disable max-len */
import axios from 'axios'
import types from './types'
import { tokenValidation } from './UserActions'

export const addSuccess = (cart = []) => ({ type: types.ADD_TO_CART, payload: { items: cart.items, subTotal: cart.subTotal } })

export const clearCartState = () => ({ type: types.RESET_CART_STATE, payload: null })

export const deleteSuccess = (cart = []) => ({ type: types.DELETE_CART_ITEM, payload: { items: cart.items, subTotal: cart.subTotal } })

export const userCartReceived = (cart = []) => ({ type: types.CART_LOADED, payload: { items: cart[0].items, subTotal: cart[0].subTotal } })

export const errorCartAction = (error) => ({ type: types.CART_ERROR, payload: { fetching: false, error } })

export const fetchingCart = () => ({ type: types.CART_FETCHING })

export const getUserCart = (userId = '') => (dispatch, getState) => {
  dispatch(fetchingCart())
  axios
    .get(`/api/cart/${userId}`, tokenValidation(getState))
    .then((cart) => dispatch(userCartReceived(cart.data)))
    .catch((err) => dispatch(errorCartAction(err)))
}

export const addToCart = (userId = '', itemDetails = {}) => (dispatch, getState) => {
  dispatch(fetchingCart())
  axios
    .put(`/api/cart/add-to-cart/${userId}`, itemDetails, tokenValidation(getState))
    .then((cart) => dispatch(addSuccess(cart.data)))
    .catch((err) => dispatch(errorCartAction(err)))
}

export const deleteFromCart = (userId = '', itemId = '') => (dispatch) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: token },
    params: {
      itemId,
    },
  }
  dispatch(fetchingCart())
  axios
    .delete(`/api/cart/delete-item/${userId}`, config)
    .then((cart) => {
      dispatch(deleteSuccess(cart.data))
    })
    .catch((err) => dispatch(errorCartAction(err)))
}
