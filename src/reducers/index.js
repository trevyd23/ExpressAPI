import { combineReducers } from 'redux'

import itemReducer from './itemReducer'
import userReducer from './userReducer'

const appReducer = combineReducers({
    items: itemReducer,
    user: userReducer
})

export default appReducer