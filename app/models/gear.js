const mongoose = require('mongoose')

const gearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        tpye: Number,
        required: true,
        min: 1
    },    
    description: {
         type: String
    }

})

module.exports = gearSchema