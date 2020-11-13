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
    }

})

module.exports = User = mongoose.model('user', UserSchema);