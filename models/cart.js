const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "items",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    items: [ProductSchema],
    subTotal: {
        default: 0,
        type: Number
    }
})

module.exports = Cart = mongoose.model('Cart', CartSchema)