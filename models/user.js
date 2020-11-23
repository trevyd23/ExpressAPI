const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    registeredDate:
    {
        type: Date,
        default: new Date()
    },
    cart:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }

})

module.exports = User = mongoose.model('user', UserSchema);