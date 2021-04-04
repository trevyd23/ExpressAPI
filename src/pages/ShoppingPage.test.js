import { fireEvent, render, screen } from '@testing-library/react';
import ShoppingPage from './ShoppingPage'
import React from 'react';
import { userInitialState } from '../redux/reducers/userReducer'
import { renderWithRedux } from '../../utilities/testUtilityFunctions'
import { cartInitialState } from '../redux/reducers/cartReducer';
import { itemInitialState } from '../redux/reducers/itemReducer';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history'
import store from '../store';


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

jest.mock('../index.css', () => {
    return {
        sizePhablet: 500,
        sizeSmallTablet: 768,
        sizeTablet: 1024,
        sizeDesktop: 1440,
        sizeLargeDesktop: 1920
    }
})

jest.mock('../cssStyles/cart.css', () => {
    return {
        sizePhablet: 500,
        sizeSmallTablet: 768,
        sizeTablet: 1024,
        sizeDesktop: 1440,
        sizeLargeDesktop: 1920
    }
})

jest.mock('../cssStyles/card.css', () => {
    return {
        sizePhablet: 500,
        sizeSmallTablet: 768,
        sizeTablet: 1024,
        sizeDesktop: 1440,
        sizeLargeDesktop: 1920
    }
})

jest.mock('../cssStyles/shoppingList.css', () => {
    return {
        sizePhablet: 500,
        sizeSmallTablet: 768,
        sizeTablet: 1024,
        sizeDesktop: 1440,
        sizeLargeDesktop: 1920
    }
})

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useHistory: () => ({
            push: mockHistoryPush
        }),
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
    }
})

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
}

global.localStorage = localStorageMock

describe('Shopping page tests', () => {

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
        render(renderWithRedux(<Router history={history}> <ShoppingPage /></Router>, combineReducers))

    })

    it('should render shopping page successfully', () => {
        const divElement = screen.findByTestId('main-div')

        expect(divElement).toBeTruthy()
    })

    it('should dispatch redux actionc when logout button is clicked', async () => {
        const logoutButton = await screen.getByText('Log Out')

        await fireEvent.click(logoutButton)

        expect(mockDispatch).toHaveBeenCalledTimes(7)

    })



})