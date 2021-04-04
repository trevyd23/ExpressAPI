import React from 'react';
import AppNavbar from '../components/AppNavbar';
import ErrorModal from '../components/ErrorModal';
import ItemModal from '../components/ItemModal';
import ShoppingList from '../components/ShoppingList';


const ShoppingPage = () => {
    const height = window.screen.height;
    const width = window.screen.availWidth;

    return (<div data-testid='main-div'>
        {/* // <Container style={{ padding: 0, height: `${height}px`, width: `${width}px`, background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(57,57,91,1) 20%, rgba(0,212,255,1) 100%)' }} fluid> */}
        <AppNavbar />
        <ItemModal />
        <ErrorModal />
        <ShoppingList />
    </div>
        // {/* // </Container> */ }
    )
}

export default ShoppingPage