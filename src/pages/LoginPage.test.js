import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from './LoginPage'
import React from 'react';
import { userInitialState } from '../redux/reducers/userReducer'
import { renderWithRedux } from '../../utilities/testUtilityFunctions'
import { cartInitialState } from '../redux/reducers/cartReducer';
import { itemInitialState } from '../redux/reducers/itemReducer';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history'




jest.mock('../cssStyles/login.css', () => {
    return {
        sizePhablet: 500,
        sizeSmallTablet: 768,
        sizeTablet: 1024,
        sizeDesktop: 1440,
        sizeLargeDesktop: 1920
    }
})
jest.mock('bootstrap/dist/css/bootstrap.min.css', () => {
    return {
        sizePhablet: 500,
        sizeSmallTablet: 768,
        sizeTablet: 1024,
        sizeDesktop: 1440,
        sizeLargeDesktop: 1920
    }
})

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useHistory: jest.fn(),
        useRouteMatch: jest.fn(() => {
            return { url: '/entry' };
        }),
    }
})

let mockDispatch = jest.fn()
jest.mock('react-redux', () => {
    const { Provider, useSelector } = jest.requireActual('react-redux')

    return {
        useDispatch: () => mockDispatch,
        // we ensure that these are original  
        useSelector,
        Provider
    };
});

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;


describe('Login page tests', () => {

    const userReducer = () => userInitialState

    const cartReducer = () => cartInitialState

    const itemReducer = () => itemInitialState

    const combineReducers = {
        user: userReducer,
        cart: cartReducer,
        items: itemReducer
    }

    const history = createMemoryHistory()

    beforeEach(() => {
        render(renderWithRedux(<Router history={history}> <LoginPage /></Router>, combineReducers))
    })

    it('should render successfully with initial state', () => {
        const login = screen.findAllByText('Sign In')

        expect(login).toBeTruthy()
    })

    it('should dispatch login action when submit is clicked', async () => {
        const submitButton = await screen.getByText('Submit')

        await fireEvent.click(submitButton)

        expect(mockDispatch).toBeCalledTimes(1)
    })
})