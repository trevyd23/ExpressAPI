import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Spinner } from 'reactstrap'
import { getUserCart } from '../redux/actions/cartActions'
import '../cssStyles/cart.css'
import CartItems from './CartItems'

// eslint-disable-next-line react/prop-types
const CartView = ({ isVisible }) => {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserCart(user.id))
  }, [dispatch, user.id])
  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="popUp"
      unmountOnExit
    >
      <div style={{
        height: 600, overflowY: 'scroll', maxHeight: 1200, width: 500, zIndex: 3, border: '1px solid black', backgroundColor: 'white', padding: 5, position: 'absolute', top: 50, left: 900, borderRadius: 10, boxShadow: `${10}px ${10}px ${5}px black`,
      }}
      >
        <div style={{
          height: '100%', width: '100%', border: '1px solid black', backgroundColor: '#343a40', padding: 10,
        }}
        >
          <div style={{
            backgroundColor: 'white', width: '100%', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <h1>Shopping Cart</h1>
          </div>
          <hr style={{ border: '3px solid white' }} />

          <div style={{
            backgroundColor: 'white', width: '100%', height: 400, overflowY: 'scroll', minHeight: 400, maxHeight: 1000, paddingBottom: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5,
          }}
          >
            {cart.isFetching ? <Spinner color="primary" />
              : <CartItems items={cart.items} />}
          </div>
          <hr style={{ border: '3px solid white' }} />
          <div style={{
            padding: 10, backgroundColor: 'white', width: '100%', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
          >
            <h4>SubTotal:</h4>
            <h6>
              $
              {cart.subTotal}
            </h6>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default CartView
