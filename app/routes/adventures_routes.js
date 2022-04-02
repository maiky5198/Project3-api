const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')

const Adventure = require('../models/adventure')

//this function sends a 404 when non-existent document is requested
const handle404 = customErrors.handle404

//middleware that can send a  401 when a user tries to access something they do not own
const requireOwnership = customErrors.requireOwnership
//requireToken is passed as a second arg to router.<verb>
//makes it so that a token MUST be passed for that route to be available --> also sets 'req.user'
const requireToken = passport.authenticate('bearer', {session: false})

const removeBlanks = require('../../lib/remove_blank_fields')
const { handle } = require('express/lib/application')

const router = express.Router()

//ROUTES GO HERE

//INDEX ROUTE
//Get adventures 
router.get('/adventures', (req, res, next)=>{
    Adventure.find()
    .populate('owner')
        .then(adventures =>{
            return adventures.map(adventure => adventure.toObject())
        })
        .then(adventures =>{
            res.status(200).json({adventures: adventures})
        })
        .catch(next)
})


//ROUTES ABOVE HERE




module.exports = router