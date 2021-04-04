import types from "./types"
import axios from 'axios';
import { tokenValidation } from "./UserActions";

export const getUserCart = (userId = '') => (dispatch, getState) => {
    dispatch(fetchingCart())
    axios
        .get(`/api/cart/${userId}`, tokenValidation(getState))
        .then(cart =>
            dispatch(userCartReceived(cart.data))
        )
        .catch(err => dispatch(errorCartAction(err)))
}

export const addToCart = (userId = '', itemDetails = {}) => (dispatch, getState) => {
    dispatch(fetchingCart())
    axios
        .put(`/api/cart/add-to-cart/${userId}`, itemDetails, tokenValidation(getState))
        .then(cart => dispatch(addSuccess(cart)))
        .catch(err => dispatch(errorCartAction(err)))
}

export const deleteFromCart = (userId = '', itemId = '') => (dispatch, getState) => {

    const token = localStorage.getItem('token')
    let config = {
        headers: { 'Authorization': token },
        params: {
            itemId: itemId
        }
    }
    dispatch(fetchingCart())
    axios
        .delete(`/api/cart/delete-item/${userId}`, config)
        .then(cart => {
            dispatch(deleteSuccess(cart))
        })
        .catch(err => dispatch(errorCartAction(err)))
}

export const addSuccess = (cart = []) => {
    return { type: types.ADD_TO_CART, payload: { items: cart[0].items, subTotal: cart[0].subTotal } }
}

export const clearCartState = () => {
    return { type: types.RESET_CART_STATE, payload: null }
}

export const deleteSuccess = (cart = []) => {
    return { type: types.DELETE_CART_ITEM, payload: { items: cart[0].items, subTotal: cart[0].subTotal } }
}

export const userCartReceived = (cart = []) => {
    return { type: types.CART_LOADED, payload: { items: cart[0].items, subTotal: cart[0].subTotal } }
}

export const errorCartAction = (error) => {
    return { type: types.CART_ERROR, payload: { fetching: false, error: error } }
}

export const fetchingCart = () => {
    return { type: types.CART_FETCHING }
}