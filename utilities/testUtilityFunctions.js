import { Provider } from 'react-redux'
import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const middleware = [thunk]

export const createMockStore = (combinedReducers) => {
    const store = createStore(combineReducers(combinedReducers), compose(
        applyMiddleware(...middleware)))
    return store
}

export const renderWithRedux = (component, combinedReducersObject) => {
    const testStore = createStore(combineReducers(combinedReducersObject), compose(
        applyMiddleware(...middleware)))
    return (<Provider store={testStore}>{component}</Provider>)
}


