import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import ItemModal from './components/ItemModal'
import { Container } from 'reactstrap'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ErrorModal from './components/ErrorModal';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ErrorModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}



export default App;
