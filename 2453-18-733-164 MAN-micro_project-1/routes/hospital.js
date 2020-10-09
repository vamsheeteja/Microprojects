const express = require('express')
const app = express()
const router = express.Router() 

const hospital = require('../models/hospital')
let middleware = require('../middleware')
const bodyparser = require('body-parser')


app.use(bodyparser.json())

// get data
router.get('/', middleware.checkToken, async(req, res) => {
    try{
        const hospitaldat = await hospital.find()
        res.json(hospitaldat) 
    }
    catch(err){
        res.send("Error" + err)
    }
})

// get data by using id
router.get('/:id', async function(res, req){
    try{
        const hospitaldat1 = await hospital.findById(req.params.id)
        res.json(hospitaldat1)
    }
    catch(err){
        res.send("Error" + err)
    }
})

// search hospital by name
router.post('/hospitalname', async function(req, res){
    const name = req.body.name
    const hospname = await hospital.find({name: req.body.name})
    res.json(hospname)
})

//posting the data
router.post('/', async (req, res) => {
    const hospitals = new hospital({
        hid: req.body.hid,
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        contact: req.body.contact
    })

    try{
        const a1 = await hospitals.save()
        res.json(a1)
    }
    catch(err){
        res.send("Error" + err)
    }
})

// deleting the data
router.delete('/:id', async (req, res) => {
    try{
        const hospitaldat1 = await hospital.remove({_id: req.params.id})
        res.json(hospitaldat1)
    }
    catch(err){
        res.json("Error" + err)
    }
})

// updation of data
router.patch('/:id', async (req, res) => {
    try{
        const hospitaldat1 = await hospital.updateMany({_id: req.params.id}, {$set: {hid: req.body.hid, name: req.body.name, location: req.body.location, address: req.body.address, contact: req.body.contact}})
        res.json(hospitaldat1)
    }
    catch(err){
        res.send('Error' + err)
    }
})

module.exports = router