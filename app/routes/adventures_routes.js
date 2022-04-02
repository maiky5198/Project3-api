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
const adventure = require('../models/adventure')

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

// SHOW
// GET /adventures/62489de4569a9cb06f4303a4
router.get('/adventures/:id', (req, res, next) => {
    // we get the id from req.params.id -> :id
    Adventure.findById(req.params.id)
        .then(handle404)
        // if its successful, respond with an object as json
        .then(adventure => res.status(200).json({ adventure: adventure.toObject() }))
        // otherwise pass to error handler
        .catch(next)
})

//CREATE
//POST /adventures
router.post('/adventures', requireToken, (req, res, next)=>{
    //we brought in requreToken so we can have access to req.user
    req.body.adventure.owner = req.user.id
    Adventure.create(req.body.adventure)
        .then(adventure =>{
            //send a successful response like this
            res.status(201).json({ adventure: adventure.toObject() })
        })
        //if an error occurs pass it to the error handler
        .catch(next)
})

//UPDATE
//PATCH /adventures/62489de4569a9cb06f4303a4
router.patch('/adventures/:id', requireToken, removeBlanks, (req, res, next)=>{
    //if the client attempts to change the owner of the pet we can disallow that from the get go
    delete req.body.owner
    //then find adventure by id
    Adventure.findById(req.params.id)
    //handle 404
    .then(handle404)
    //require ownership and update adventure
    .then(adventure =>{
        requireOwnership(req, adventure)
        return adventure.updateOne(req.body.adventure)
    })
    //send a 204 no content if successful 
    .then(()=>res.sendStatus(204))
    //pass to errorhandler if not successful
    .catch(next)
})

//REMOVE
//DELETE /pets/624470c12ed7079ead53d4df
router.delete('/adventures/:id', requireToken, (req, res, next) =>{
    //find the adventure by id
    Adventure.findById(req.params.id)
        .then(handle404)
        .then(adventure => {
            //requireOwnership needs two arguments
            //these are the request itself and the document itself
            requireOwnership(req, adventure)
            //we'll delete if the middleware doesn't throw an error
            adventure.deleteOne()
        })
        .then(()=>res.sendStatus(204))
    //first handle the 404 if any
    //use requireownership middleware to make sure the right person is making the request
    //send back a 204 no content status if error occurs
    //if error occurs, pass to the handler
        .catch(next)
})


//ROUTES ABOVE HERE




module.exports = router