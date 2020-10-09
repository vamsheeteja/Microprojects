const mongoose = require('mongoose')

const ventilatorschema = new mongoose.Schema({
    hid:
    {
        type: String,
        required: true
    },
    
    ventilatorid:
    {
        type: String,
        required: true
    },

    status:
    {
        type: String,
        required: true
    },

    name:
    {
    type: String,
    required: true
    }
})

module.exports = mongoose.model('ventilator', ventilatorschema)