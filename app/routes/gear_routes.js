const express = require('express')
const passport = require('passport')

const Adventure = require('../models/adventure')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', {session: false})

const removeBlanks = require('../../lib/remove_blank_fields')
const { handle } = require('express/lib/application')

const router = express.Router()

//ROUTES GO HERE

//POST -> create gear
//POST /gear/<adventure_id>
router.post('/gear/:adventureId', requireToken, (req, res, next)=>{
    //get our gear from req.body
    const gear = req.body.gear
    //get our adventureId from req.params.id
    const adventureId = req.params.adventureId
    //find the adventure
    Adventure.findById(adventureId)
        .then(handle404)
    //push the gear to the gear array
        .then(adventure => {
            console.log('this is the adventure', adventure)
            console.log('this is the gear', gear)
            requireOwnership(req, adventure)
            adventure.gear.push(gear)
            //save the adventure
            return adventure.save()
        })
    //then we send the adventure as json
        .then(adventure => res.status(201).json({adventure: adventure}))
    //catch errors and send to the handler
        .catch(next)
})
// //PATCH -> update a piece of gear
//PATCH /gear/<adventure_id>/<gear_id>
router.patch('/gear/:adventureId/:gearId', requireToken, removeBlanks, (req, res, next)=>{
    const gearId = req.params.gearId
    const adventureId = req.params.adventureId

    Adventure.findById(adventureId)
        .then(handle404)
        .then(adventure => {
            const theGear = adventure.gear.id(gearId)
            console.log('this is the original gear')
            requireOwnership(req, adventure)
            theGear.set(req.body.gear)
            return adventure.save()
        })
        .then(()=> res.sendStatus(204))
        .catch(next)
})
//DELETE -> delete a piece of gear
//DELETE /gear/<adventure_id>/<gear_id>
router.delete('/gear/:adventureId/:gearId', requireToken, (req, res, next)=>{
    const gearId = req.params.gearId
    const adventureId = req.params.adventureId
    //find the adventure in the database
    Adventure.findById(adventureId)
        //if adventure not found 404
        .then(handle404)
        .then(adventure => {
            //get the subdocument by its id
            const theGear =  adventure.gear.id(gearId)
            //require that the deleter is the owner of the adventure
            requireOwnership(req, adventure)
            //call remove on the gear we got on the line above requireOwnership
            theGear.remove()
            //return the saved adventure
            return adventure.save()
        })
        //send 204 no content
        .then(() => res.sendStatus(204))
        .catch(next)
})




module.exports = router