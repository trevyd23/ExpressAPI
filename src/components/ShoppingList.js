import React, { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Alert, Row, Col } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, getItems, updateItem } from '../redux/actions/itemActions'
import { Spinner } from 'reactstrap';
import '../index.css'
import '../cssStyles/shoppingList.css'
import UpdateModal from './UpdateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessModal from './SuccessModal';
import ItemCard from './ItemCard';
import AppNavbar from './AppNavbar';
import { getUserCart } from '../redux/actions/cartActions';



const ShoppingList = (props) => {

    const [updating, setIsUpdating] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [itemSelectedPrice, setItemPrice] = useState(0)
    const [itemSelectedName, setItemName] = useState('')
    const [itemSelectedID, setItemID] = useState('')

    const { items = [] } = useSelector(state => state.items)

    const isFetching = useSelector(state => state.items.isFetching)

    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('token', localStorage.getItem('token'))
        dispatch(getItems())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUserCart(user.id))
    }, [])



    const removeItem = (id) => {
        dispatch(deleteItem(id))
    }

    const updateItem = (id, price, name) => {
        setIsUpdating(!updating)
        setItemName(name)
        setItemPrice(price)
        setItemID(id)

    }

    const toggleUpdate = () => {
        setIsUpdating(!updating)

    }



    return (<>

        <SuccessModal isOpen={isSuccess} setOpen={toggleUpdate} onSuccess={() => { dispatch(getItems()) }} message={`Successfully updated ${itemSelectedName}`} />
        <UpdateModal isOn={updating} setToggle={toggleUpdate} nameItem={itemSelectedName} id={itemSelectedID} priceItem={itemSelectedPrice} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className='list'>
                {!isFetching ?

                    items.map((x, index) =>
                        <>
                            <ItemCard id={index} itemId={x._id} name={x.name} price={x.price} onDelete={() => removeItem(x._id)} onUpdate={() => updateItem(x._id, x.price, x.name)} />

                        </>
                    )

                    : <Container className='shopping-container'>
                        <Spinner color="primary" />
                    </Container>
                }
            </div>
        </div>
    </>

    )
}



export default ShoppingList