import axios from 'axios'
import types from './types'

export const errorUser = (error) => {
  localStorage.removeItem('token')
  return { type: types.USER_ERROR_FETCHING, message: error.response.data.message }
}

export const registerUserSuccess = (user) => ({
  type: types.REGISTER_USER,
  token: user.token,
  fetching: false,
  user: user.user,
})

export const userFetching = () => ({ type: types.USER_FETCHING })

export const loginUserSuccess = (user) => {
  localStorage.setItem('token', user.token)
  return { type: types.LOGIN, payload: user }
}

// eslint-disable-next-line no-unused-vars
export const tokenValidation = (getState) => {
  // Get token from local storage
  const token = localStorage.getItem('token')

  // Add token to headers
  const config = {
    headers: {
      Authorization: '',
    },
  }

  // Check if there is token
  if (token) {
    config.headers.Authorization = token
  }

  return config
}

export const userLoaded = (user) => ({ type: types.USER_LOADED, payload: user })

export const registerUser = (userData) => (dispatch) => {
  dispatch(userFetching())
  axios
    .post('/api/users/register/user', userData)
    .then((res) => {
      dispatch(registerUserSuccess(res.data))
    })
    .catch((err) => dispatch(errorUser(err)))
  return { type: types.REGISTER_USER }
}
export const loginUser = (credentials) => (dispatch) => {
  dispatch(userFetching())
  axios
    .post('/api/auth/login', credentials)
    .then((res) => {
      dispatch(loginUserSuccess(res.data))
    })
    .catch((err) => dispatch(errorUser(err)))
}

export const loadUser = () => (dispatch, getState) => {
  dispatch(userFetching())
  axios
    .get('/api/users/user-info', tokenValidation(getState))
    .then((user) => {
      dispatch(userLoaded(user.data))
    })
    .catch((err) => dispatch(errorUser(err)))
}

export const logOutUser = () => ({
  type: types.LOG_OUT,
  isAuthenticated: false,
  fetching: false,
})
