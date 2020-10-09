const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017'

const app = express()
const bodyparser = require('body-parser')

let jwt = require('jsonwebtoken')
let server = require('./server')

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('database connected...')
})

app.use(express.json())

const hospRouter = require('./routes/hospital')
app.use("/hospital", hospRouter)

const ventRouter = require('./routes/ventilator')
app.use('/ventilator', ventRouter)

app.listen(1000, () => {
    console.log('server started')
})