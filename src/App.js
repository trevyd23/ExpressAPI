import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingPage from './pages/ShoppingPage'
import LoginPage from './pages/LoginPage'



function App() {

  // useEffect(() => {
  //   store.dispatch(loadUser())
  // }, [])
  return (
    <BrowserRouter>
      <Provider store={store} data-testid='Provider'>
        <div className="App" >
          <Switch>
            <Route path="/" component={LoginPage} exact />
            <Route path="/shopping" component={ShoppingPage} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  )
}



export default App;
