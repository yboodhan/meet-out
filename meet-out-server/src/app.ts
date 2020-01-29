// Use import as opposed to standard "const express = require('express') " so that app is recognized as an "express" item!
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
//importing json module from body-parser npm module
const bodyParser = require('body-parser')
//import routes from routes file

import User from './models/user'

require('dotenv').config()
let cors = require('cors')
// let expressJwt = require('express-jwt')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

const app = express()
let rowdyResults = rowdyLogger.begin(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('dev'))
app.use(cors())

app.use('/auth', require('./controllers/auth'))
app.use('/home', require('./controllers/home'))
app.use('/meet', require('./controllers/meet'))
app.use('/profile', require('./controllers/profile'))


app.get('/', (req: Request, res: Response) => {
    res.send('Home Stub')
})

app.get('*',(req: Request, res: Response) => {
    res.send('404')
})

app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
})