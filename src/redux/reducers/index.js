import { combineReducers } from 'redux'

import itemReducer from './itemReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'

const appReducer = combineReducers({
  cart: cartReducer,
  items: itemReducer,
  user: userReducer,
})

export default appReducer
