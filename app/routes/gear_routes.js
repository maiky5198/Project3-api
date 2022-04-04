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
    //push the toy to the toys array
        .then(adventure => {
            console.log('this is the adventure', adventure)
            console.log('this is the gear', gear)
            adventure.gear.push(gear)
            //save the adventure
            return adventure.save()
        })
    //then we send the pet as json
        .then(adventure => res.status(201).json({adventure: adventure}))
    //catch errors and send to the handler
        .catch(next)
})
// //PATCH -> update a toy
// //PATCH /toys/<pet_id>/<toy_id>
// router.patch('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next)=>{
//     const toyId = req.params.toyId
//     const petId = req.params.petId

//     Pet.findById(petId)
//         .then(handle404)
//         .then(pet => {
//             const theToy = pet.toys.id(toyId)
//             console.log('this is the original toy')
//             requireOwnership(req, pet)
//             theToy.set(req.body.toy)
//             return pet.save()
//             // return {theToy, pet}
//         })
//         // .then(data => {
//         //     console.log('this is data', data)
//         //     data.theToy.set({toy: req.body.toy})
//         //     console.log('the toy after set', data.theToy)
//         //     return data.pet.save()
//         // })
//         .then(()=> res.sendStatus(204))
//         .catch(next)
// })
// //DELETE -> delete a toy
// //DELETE /toys/<pet_id>/<toy_id>
// router.delete('/toys/:petId/:toyId', requireToken, (req, res, next)=>{
//     const toyId = req.params.toyId
//     const petId = req.params.petId
//     //find the pet in the database
//     Pet.findById(petId)
//         //if pet not found 404
//         .then(handle404)
//         .then(pet => {
//             //get the subdocument by its id
//             const theToy =  pet.toys.id(toyId)
//             //require that the deleter is the owner of the pet
//             requireOwnership(req, pet)
//             //call remove on the toy we got on the line above requireOwnership
//             theToy.remove()
//             //return the saved pet
//             return pet.save()
//         })
//         //send 204 no content
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })




module.exports = router