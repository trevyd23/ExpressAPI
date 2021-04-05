import { render } from '@testing-library/react';
import App from './App.jsx';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'

jest.mock('./index.css', () => {
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
jest.mock('./cssStyles/cart.css', () => {
  return {
    sizePhablet: 500,
    sizeSmallTablet: 768,
    sizeTablet: 1024,
    sizeDesktop: 1440,
    sizeLargeDesktop: 1920
  }
})
jest.mock('./cssStyles/login.css', () => {
  return {
    sizePhablet: 500,
    sizeSmallTablet: 768,
    sizeTablet: 1024,
    sizeDesktop: 1440,
    sizeLargeDesktop: 1920
  }
})
jest.mock('./cssStyles/card.css', () => {
  return {
    sizePhablet: 500,
    sizeSmallTablet: 768,
    sizeTablet: 1024,
    sizeDesktop: 1440,
    sizeLargeDesktop: 1920
  }
})

jest.mock('./cssStyles/shoppingList.css', () => {
  return {
    sizePhablet: 500,
    sizeSmallTablet: 768,
    sizeTablet: 1024,
    sizeDesktop: 1440,
    sizeLargeDesktop: 1920
  }
})
describe('renders main app component', () => {

  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });

  it('should render component', () => {
    const app = render(<BrowserRouter><App /></BrowserRouter>)

    //const linkElement = screen.getByText(/learn react/i);
    expect(app).toBeTruthy()
  })

});


