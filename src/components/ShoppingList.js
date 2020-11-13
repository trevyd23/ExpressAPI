import React, { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, getItems } from '../actions/itemActions'
import { Spinner } from 'reactstrap';
import '../cssStyles/shoppingList.css'



const ShoppingList = (props) => {

    const items = useSelector(state => state.items.items)

    const isFetching = useSelector(state => state.items.isFetching)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])

    const removeItem = (id) => {
        dispatch(deleteItem(id))
    }

    return (
        <Container className='shopping-container'>
            {!isFetching ?
                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <Button className='remove-btn' color='danger' size='sm' onClick={() => removeItem(_id)}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        )
                        )}
                    </TransitionGroup>


                </ListGroup>
                : <Container className='shopping-container'>
                    <Spinner color="primary" />
                </Container>
            }
        </Container>
    )
}



export default ShoppingList