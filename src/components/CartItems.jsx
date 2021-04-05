import React from 'react'
import {
  Badge, Button, ListGroup, ListGroupItem,
} from 'reactstrap'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, getUserCart } from '../redux/actions/cartActions'

// eslint-disable-next-line react/prop-types
const CartItems = ({ items = [] }) => {
  const userId = useSelector((state) => state.user.user.id)

  const dispatch = useDispatch()

  const deleteItem = (itemId = '') => {
    dispatch(deleteFromCart(userId, itemId))

    setTimeout(() => {
      dispatch(getUserCart(userId))
    }, 200)
  }

  return (
    <ListGroup style={{ width: '100%', height: '100%' }}>
      { items.map((item, index) => (
        <ListGroupItem
          style={{
            height: 80, minHeight: 80, display: 'flex', alignItems: 'center', margin: 10, boxShadow: `${8}px ${8}px ${3}px black`,
          }}
          className="justify-content-between"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <div style={{
            width: 150, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
          >
            {item.name}
            <FaTimes style={{ margin: 5 }} />
            {' '}
            <Badge pill>
              {item.quantity}
              {' '}
            </Badge>
          </div>
          <div>
            <h1 style={{ fontSize: 20 }}>Price:</h1>
            <p>
              $
              {item.price}
            </p>
          </div>
          <Button onClick={() => deleteItem(item.productId)} style={{ backgroundColor: 'red' }}>
            <FaTimes />
            {' '}
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default CartItems
