const express = require('express')
const app = express()
const router = express.Router() 

const ventilator = require('../models/ventilator')
let middleware = require('../middleware')
const bodyparser = require('body-parser')


app.use(bodyparser.json())

// get req from server
router.get('/', middleware.checkToken, async(req, res) => {
    try{
        const ventilatordat = await ventilator.find()
        res.json(ventilatordat) 
    }
    catch(err){
        res.send('Error ' + err)
    }
})

// get a particular data by using id
router.get('/:id', middleware.checkToken, async function(res, req){
    try{
        const ventilatordat1 = await ventilator.findById(req.params.id)
        res.json(ventilatordat1)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

// getting ventilator details using status
router.post('/searchbystatus', middleware.checkToken, async function(req, res){
    const ventstatus = req.body.status
    const ventstatusdat1 = await ventilator.find({name: req.body.status})
    res.json(ventstatusdat1)
})

//getting ventilator details using hospitalname
router.post('/searchventbyhosname', middleware.checkToken, async (req, res) => {
    const hosname = req.body.name
    var vendat = await ventilator.find({name: req.body.name})
    res.json(vendat)
})

// posting data
router.post('/', middleware.checkToken ,async (req, res) => {
    const ventilators = new ventilator({
        hid: req.body.hid,
        ventilatorid: req.body.ventilatorid,
        status: req.body.status,
        name: req.body.name

    })
    try{
        const a2 = await ventilator.save()
        res.json(a2)
    }
    catch(err){
        res.send('Error ' + err)
    }

})

// deleting data
router.delete('/:id', middleware.checkToken, async (req, res) => {
    try{
        const ventilatordat = await ventilator.remove({_id: req.params.id})
        res.json(ventilatordat)
    }
    catch{
        res.send('Error ' + err)
    }
})

// updation of data
router.patch('/:id', middleware.checkToken, async (req, res) => {
    try{
        const ventilatordat1 = await hospital.updateMany({_id: req.params.id}, {$set: {hid: req.body.hid, ventilatorid: req.body.ventilatorid, status: req.body.status, name: req.body.name}})
        res.json(ventilatordat1)
    }
    catch(err){
        res.send('Error' + err)
    }
})

module.exports = router