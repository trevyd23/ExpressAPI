/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getItems } from '../redux/actions/itemActions'

import '../index.css'
import '../cssStyles/shoppingList.css'
import UpdateModal from './UpdateModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import SuccessModal from './SuccessModal'
import ItemCard from './ItemCard'
import { getUserCart } from '../redux/actions/cartActions'

const ShoppingList = () => {
  const [updating, setIsUpdating] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isSuccess, setIsSuccess] = useState(false)
  const [itemSelectedPrice, setItemPrice] = useState(0)
  const [itemSelectedName, setItemName] = useState('')
  const [itemSelectedID, setItemID] = useState('')

  const { items = [] } = useSelector((state) => state.items)

  const isFetching = useSelector((state) => state.items.isFetching)

  const user = useSelector((state) => state.user.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserCart(user.id))
  }, [dispatch, user.id])

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

  const getItemsList = useCallback(() => {
    dispatch(getItems())
  }, [dispatch])
  return (
    <>

      <SuccessModal isOpen={isSuccess} setOpen={toggleUpdate} onSuccess={getItemsList} message={`Successfully updated ${itemSelectedName}`} />
      <UpdateModal isOn={updating} setToggle={toggleUpdate} nameItem={itemSelectedName} id={itemSelectedID} priceItem={itemSelectedPrice} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="list">
          {!isFetching

            ? items.map((x, index) => (
              <>
                <ItemCard id={index} itemId={x._id} name={x.name} price={x.price} onDelete={() => removeItem(x._id)} onUpdate={() => updateItem(x._id, x.price, x.name)} />

              </>
            ))

            : (
              <Container className="shopping-container">
                <Spinner color="primary" />
              </Container>
            )}
        </div>
      </div>
    </>

  )
}

export default ShoppingList
