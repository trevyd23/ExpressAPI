import types from './types'

import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

export const getItems = () => (dispatch) => {
    dispatch(fetchingItems())
    axios
        .get('/api/items')
        .then(res => dispatch({ type: types.GET_ITEMS, payload: { items: res.data, fetching: false, errorMessage: '' } }))
        .catch(err => dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err } }))
    return { type: types.GET_ITEMS }
}

export const addItem = (item = {}) => (dispatch) => {
    dispatch(fetchingItems())
    axios
        .post('/api/items/create/item', item)
        .then(res =>
            dispatch({ type: types.ADD_ITEM, payload: res.data })
        )
        .catch(err => dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err } }))

}

export const deleteItem = (id) => dispatch => {
    dispatch(fetchingItems())
    axios
        .delete(`/api/items/${id}`)
        .then(res => {
            dispatch({ type: types.DELETE_ITEM, payload: { id: res.data.itemID, fetching: false, errorMessage: '' } })
            //dispatch({ type: types.GET_ITEMS, payload: {  fetching: false, errorMessage: '' } })
        })
        .catch(err => {
            dispatch({ type: types.ERROR_FETCHING, payload: { fetching: false, errorMessage: err.response.data.message } })
        })

    return { type: types.DELETE_ITEM, payload: id }
}

export const fetchingItems = () => {
    return { type: types.ITEM_FETCHING }
}

export const errorItemAction = () => {
    return { type: types.ERROR_FETCHING, payload: false }
}