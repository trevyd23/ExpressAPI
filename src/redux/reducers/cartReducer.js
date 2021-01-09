import types from '../actions/types';

const initialState =
{
    items: [],
    isFetching: false,
    isError: false,
    errorMessage: '',
    subTotal: 0
}
export default function (state = initialState, action) {

    switch (action.type) {
        case types.CART_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case types.RESET_CART_STATE:
            return {
                ...state,
                items: [],
                isFetching: false,
                isError: false,
                errorMessage: '',
                subTotal: 0
            }
        case types.CART_LOADED:
            return {
                ...state,
                items: action.payload.items,
                isFetching: false,
                isError: false,
                subTotal: action.payload.subTotal
            }
        case types.ADD_TO_CART:
            return {
                ...state,
                items: action.payload.items,
                isFetching: false,
                isError: false,
                subTotal: action.payload.subTotal
            }
        case types.DELETE_CART_ITEM:
            return {
                ...state,
                items: [...action.payload.items],
                isFetching: false,
                isError: false,
                subTotal: action.payload.subTotal
            }
        case types.CART_ERROR:
            return {
                ...state,
                items: state.items,
                isFetching: false,
                isError: true,
                subTotal: state.subTotal,
                errorMessage: action.payload.error
            }
        default: return state
    }
}