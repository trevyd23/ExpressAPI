const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    branch:
    {
        type: String
    }
})



module.exports = Student = mongoose.model('student', studentSchema)