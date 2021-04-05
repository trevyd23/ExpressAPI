const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authMiddleware = require('../../middleware/AuthMiddleware');


const Cart = require('../../models/cart');
const user = require('../../models/user');

//Get all carts
router.get('/carts', (req, res) => {
    Cart.find()
        .then(carts => res.json(carts))
        .catch(err => res.status(400).send(err))
});

//Post create a cart
router.post('/create-cart', authMiddleware, (req, res) => {
    const newCart = new Cart(
        {
            user: req.body.id,
            items: []
        })

    Cart.find()
        .then(cart => {
            const arr = cart.filter(x => x.user.toString() === req.body.id)
            if (arr.length !== 0) {
                return res.status(400).
                    json({
                        cart: cart.filter(x => x.user.toString() === req.body.id),
                        message: 'Cart already exists for this user'
                    })
            } else {
                newCart.save()
                    .then(cart => res.status(201).json({
                        message: 'Cart created',
                        cart: cart
                    })).catch(err => res.status(400).send(err))
            }
        }).catch(err => {
            res.status(404).send(err)
        })




})

router.delete('/delete-item/:id', authMiddleware, (req, res) => {
    const itemId = req.query.itemId

    Cart.find()
        .then(carts => {
            const userCart = carts.filter(x => x.user.toString() === req.params.id)

            const productExistsIndex = userCart[0].items.findIndex(x => x.productId.toString() === itemId);

            if (productExistsIndex !== -1) {
                const removedItem = userCart[0].items.splice(productExistsIndex, 1)

                userCart[0].subTotal = userCart[0].subTotal - (removedItem[0].quantity * removedItem[0].price)
            } else {
                return res.status(404).json({ message: 'Item is not in cart' })
            }

            Cart.findByIdAndUpdate(userCart[0]._id, userCart[0])
                .then(() => {
                    Cart.findById(userCart[0]._id)
                        .then(cart => res.status(200).json(cart))
                        .catch(err => res.status(404).send(err))
                })
                .catch(err => res.status(404).json({
                    message: 'User cart not found',
                    error: err
                }))
        }).catch(err => res.status(404).json({ message: 'Could not locate user cart', error: err }))
})

//Add new item to cart
router.put('/add-to-cart/:id', authMiddleware, (req, res) => {

    const { id, quantity, price, name } = req.body

    const itemToadd =
    {
        productId: mongoose.Types.ObjectId(id),
        quantity: quantity,
        price: price,
        name: name
    }

    Cart.find()
        .then(carts => {
            const userCart = carts.filter(x => x.user.toString() === req.params.id)

            //Check if item is already in cart
            const productExistsIndex = userCart[0].items.findIndex(x => x.productId.toString() === itemToadd.productId.toString());

            const defaultItemToAdd =
            {
                ...itemToadd,
                quantity: 1
            }

            productExistsIndex === -1 ? userCart[0].items.push(itemToadd) : userCart[0].items[productExistsIndex].quantity = userCart[0].items[productExistsIndex].quantity + quantity

            productExistsIndex === -1 ? userCart[0].subTotal = userCart[0].subTotal + (itemToadd.price * itemToadd.quantity)
                : userCart[0].subTotal = userCart[0].subTotal + (quantity === 1 ? userCart[0].items[productExistsIndex].price : (quantity * userCart[0].items[productExistsIndex].price))

            Cart.findByIdAndUpdate(userCart[0]._id, userCart[0])
                .then(() => {
                    Cart.findById(userCart[0]._id)
                        .then(cart => res.status(200).json(cart))
                        .catch(err => res.status(404).send(err))
                })
                .catch(err => res.status(404).json({
                    message: 'User cart not found',
                    error: err
                }))
        }).catch(err => res.status(404).json({
            message: 'User cart not found',
            error: err
        }))
        .catch(err => res.status(400).send(err))
})




//Get user's cart
router.get('/:id', authMiddleware, (req, res) => {

    Cart.find()
        .then(carts => {
            const userCart = carts.filter(x => x.user.toString() === req.params.id)
            res.status(200).send(userCart)
            // res.status(200).send(carts.filter(cart => new String(cart.user).valueOf() === new String(req.params.id)).valueOf())
        })
        .catch(err => res.status(404).json({
            message: 'User cart not found',
            error: err
        }))
});

module.exports = router;