import types from '../actions/types'

export const cartInitialState = {
  items: [],
  isFetching: false,
  isError: false,
  errorMessage: null,
  subTotal: 0,
}
// eslint-disable-next-line func-names
export default function (state = cartInitialState, action) {
  switch (action.type) {
    case types.CART_FETCHING:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      }
    case types.RESET_CART_STATE:
      return {
        ...state,
        items: [],
        isFetching: false,
        isError: false,
        errorMessage: null,
        subTotal: 0,
      }
    case types.CART_LOADED:
      return {
        ...state,
        items: action.payload.items,
        isFetching: false,
        isError: false,
        subTotal: action.payload.subTotal,
        errorMessage: null,
      }
    case types.ADD_TO_CART:
      return {
        ...state,
        items: action.payload.items,
        isFetching: false,
        isError: false,
        subTotal: action.payload.subTotal,
        errorMessage: null,
      }
    case types.DELETE_CART_ITEM:
      return {
        ...state,
        items: [...action.payload.items],
        isFetching: false,
        isError: false,
        subTotal: action.payload.subTotal,
        errorMessage: null,
      }
    case types.CART_ERROR:
      return {
        ...state,
        items: state.items,
        isFetching: false,
        isError: true,
        subTotal: state.subTotal,
        errorMessage: action.payload.error,
      }
    default: return state
  }
}
