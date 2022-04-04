// import dependencies 
const express = require('express')
const passport = require('passport')
const Comment = require('../models/comment')
const Adventure = require ('../models/adventure')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

// POST -> create a comment
// POST /comment/:advId
// make a route the posts all the new comments 
router.post('/adventure:id', (req,res, next) => {
    // get the comment from the request body
    const  comment = req.body.comment
    // get the adventure id from the req.body.id
    const adventureId =req.params.adventureId 
    // find the adventure
    Adventure.find(adventureId)
        .then(handle404)
        .then(adventure => {
            adventure.comments.push(comment)

            // save the adventure
            return adventure.save()
        })
        .then(adventure => res.status(201).json({adventure: adventure}))
        .catch(next)
})

// Delete route for the comments
router.delete('/delete/:adventureId/:commId', requireToken, (req,res, next) => {
     // saving both ids to variables for easy ref later
     const commId = req.params.commId
     const adventureId = req.params.adventureId
     // find the pet in the db
     Adventure.findById(adventureId)
         // if pet not found throw 404
         .then(handle404)
         .then(adventure => {
             // get the specific subdocument by its id
             const theComment = adventure.comment.id(commId)
             // require that the deleter is the owner of the pet
             requireOwnership(req, adventure)
             // call remove on the toy we got on the line above requireOwnership
             theComment.remove()
 
             // return the saved pet
             return adventure.save()
         })
         // send 204 no content
         .then(() => res.sendStatus(204))
         .catch(next)
})

module.exports = router