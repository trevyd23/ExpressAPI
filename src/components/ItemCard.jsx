/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Input,
} from 'reactstrap'
import '../cssStyles/card.css'
import { addToCart, getUserCart } from '../redux/actions/cartActions'

const ItemCard = ({
  id, itemId, name = 'item', price = 0, description = 'description', onDelete, onUpdate,
}) => {
  const [quantity, setQuantity] = useState(1)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const onChange = (e) => {
    // eslint-disable-next-line radix
    setQuantity(parseInt(e.target.value))
  }

  const addtoCartRequest = () => {
    const itemObj = {
      id: itemId,
      quantity,
      price,
      name,
    }
    dispatch(addToCart(user.id, itemObj))
    setTimeout(() => {
      setQuantity(0)
      dispatch(getUserCart(user.id))
    }, 200)
  }

  return (
    <Card
      key={id}
      inverse
      style={{
        backgroundColor: '#333', borderColor: '#333', borderWidth: 10, borderRadius: 10, margin: 10, boxShadow: `${8}px ${8}px ${3}px black`,
      }}
    >
      <CardImg top width="20%" src="https://picsum.photos/200" alt="Card image cap" />
      <CardBody>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',
        }}
        >
          <CardTitle tag="h5">{name}</CardTitle>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          }}
          >
            <h2 style={{ fontSize: 10, margin: 5 }}>Quantity</h2>
            <Input
              style={{ width: 45, height: 30, padding: 5 }}
              type="number"
              name="quantity"
              id="itemQuantity"
              placeholder="1"
              min="1"
              onChange={onChange}
              required
            />
          </div>

        </div>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Price $
          {price}
        </CardSubtitle>
        <CardText>{description}</CardText>
        <Button onClick={onDelete} color="dark" dark="true" className="cartBtn">Delete</Button>
        <Button onClick={onUpdate} color="dark" dark="true" className="cartBtn">Update</Button>
        <Button onClick={addtoCartRequest} color="dark" dark="true" className="cartBtn">Add to Cart</Button>
      </CardBody>
    </Card>

  )
}

export default ItemCard
