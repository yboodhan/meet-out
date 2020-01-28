// Use import as opposed to standard "const express = require('express') " so that app is recognized as an "express" item!
import express, {Request, Response} from 'express'
import mongoose from 'mongoose'
//importing json module from body-parser npm module
import {json} from 'body-parser'
//import routes from routes file

const app = express()

app.use(json())
app.use('/home', require('./controllers/home'))
app.use('/auth', require('./controllers/auth'))
app.use(express.urlencoded({extended: false}))


app.get('/', (req: Request, res: Response) => {
    res.send('Home Stub')
})

// app.use((err: Error, req: Request, res: Response) => {
//     res.status(500).json({message: err.message})
// })

app.listen(3000)