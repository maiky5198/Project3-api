// import dependecies
const mongoose = require('mongoose')
// just a schema not a model so will use standard syntax
const gearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },    
    description: {
         type: String
    }

})

module.exports = gearSchema