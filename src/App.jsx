import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import store from './store'
import ShoppingPage from './pages/ShoppingPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} data-testid="Provider">
        <div className="App">
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/shopping" component={ShoppingPage} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
