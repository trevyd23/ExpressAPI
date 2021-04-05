import types from '../actions/types'

export const userInitialState = {
  user: {},
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isFetching: false,
  isError: false,
  errorMessage: null,
}

// eslint-disable-next-line func-names
export default function (state = userInitialState, action) {
  switch (action.type) {
    case types.USER_FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    case types.LOGIN:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: { ...action.payload.user },
        errorMessage: null,
        isError: false,
      }
    case types.REGISTER_USER:
      return {
        ...state,
        isFetching: action.fetching,
        user: action.user,
        token: action.token,
      }
    case types.LOG_OUT:
      return {
        ...state,
        user: {},
        token: '',
        isAuthenticated: action.isAuthenticated,
        isFetching: action.fetching,
      }
    case types.USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isFetching: false,
      }
    case types.USER_ERROR_FETCHING:
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        isFetching: false,
        isError: true,
        errorMessage: action.message,
      }

    default: return state
  }
}
