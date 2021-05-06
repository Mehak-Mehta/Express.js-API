require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/hunters', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const huntersRouter = require('./routes/hunters')
app.use('/hunters', huntersRouter)

app.listen(3000, () => console.log('Server Started'))