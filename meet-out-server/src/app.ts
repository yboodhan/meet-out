// Use import as opposed to standard "const express = require('express') " so that app is recognized as an "express" item!
import express, { Request, Response } from 'express'
let expressJwt = require('express-jwt')
let cors = require('cors')
import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false);
//importing json module from body-parser npm module
const bodyParser = require('body-parser')
//import routes from routes file


import User from './models/user'

require('dotenv').config()

let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

const app = express()
let rowdyResults = rowdyLogger.begin(app)

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


app.use('/auth', require('./controllers/auth'))
app.use('/meet', require('./controllers/meet'))
app.use('/profile', require('./controllers/profile'))
// TODO: Add, expressJwt({ secret: 'ghjk' }) middleware

app.get('/', (req: Request, res: Response) => {
    res.send('Home Stub')
})

app.get('*',(req: Request, res: Response) => {
    res.send('404')
})

app.listen(process.env.PORT || 3000, () => {
    rowdyResults.print()
})