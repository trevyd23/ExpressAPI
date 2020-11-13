import types from './types'

import axios from 'axios';

export const registerUser = (userData) => (dispatch) => {
    dispatch(userFetching())
}

export const userFetching = () => {
    return { type: types.USER_FETCHING }
}