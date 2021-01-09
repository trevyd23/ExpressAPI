import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink,
    Button
} from 'reactstrap'
import { logOutUser } from '../redux/actions/UserActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosCart } from 'react-icons/io'
import '../index.css'
import CartView from './CartView'
import ItemNotif from './itemNotif';
import SuccessModal from './SuccessModal';
import { clearCartState } from '../redux/actions/cartActions';
import 'lodash'
import { isEmpty } from 'lodash';


const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const userName = useSelector(state => state.user.user.name)
    const cartItems = useSelector(state => state.cart.items)
    const cartError = useSelector(state => state.cart.errorMessage)

    const history = useHistory()

    useEffect(() => {
        if (isAuthenticated === false) {
            logOut()
        }
    }, [isAuthenticated])

    useEffect(() => {

        if (!isEmpty(cartError) && cartError !== '') {
            if (cartError.response.status === 401) {
                logOut()
            }
        }
    }, [cartError])

    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logOutUser())
        dispatch(clearCartState())
        history.push('/')
    }

    const showCartPopUp = () => {
        return <CartView isVisible={showCart} />
    }

    return (<>
        <Navbar color='dark' dark expand='md' className='mb-5' full >
            <NavbarBrand href='/'>{`${userName}'s Shopping List`}</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav style={{ lineHeight: 1 }} className='ml-auto' navbar>
                    <NavItem >
                        <ItemNotif cartItems={cartItems} />
                        <NavLink onClick={() =>
                            setShowCart(!showCart)}
                            className='nav-list' style={{ fontSize: 18 }}> <IoIosCart /> </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-list' href={'https://github.com/trevyd23/MernStackApplication.git'}> GitHub</NavLink>
                    </NavItem>
                    <NavItem onClick={() => { logOut() }}>
                        <NavLink className='nav-list' href='/'>Log Out</NavLink>
                    </NavItem>
                    {showCart ? showCartPopUp() : <div />}
                </Nav>
            </Collapse>
        </Navbar>
        <SuccessModal onSuccess={() => { }} />
    </>
    )
}

export default AppNavbar;