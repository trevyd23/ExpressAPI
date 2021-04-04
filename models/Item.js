const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema object
const ItemSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);

