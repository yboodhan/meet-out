require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
import { Request, Response, Router } from 'express'
import User from '../models/user'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
    console.log(req.body)
    const email = (req.body as {email: string}).email
    const password = (req.body as {password: string}).password
    db.User.findOne({ email: email })
    .then((user: User) => {
        console.log('🚣🏻‍♀️🚣🏻‍♀️🚣🏻‍♀️🚣🏻‍♀️' + password)
        if(!user || !user.password){
            return res.status(404).send({message: 'User not found'})
        }
        console.log('This is the password: ', password)
        if(!user.isValidPassword(user, password)){
            return res.status(401).send({message: 'Invalid Credentials'})
        }
        
        let token: string = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 1 //Expires in 1 hour
        })
        res.send({ token })
    })
    .catch((err: any) => {
        console.log('Error attempting to login : ', err)
        res.status(503).send({ message : 'Database not responding' })
    })
})

router.post('/signup', (req: Request, res: Response) => {
    console.log(req.body)
    const email = (req.body as {email: string}).email
    const password = (req.body as {password: string}).password
    db.User.findOne({ email: email})
    .then((user: User) => {
        if(user) {
            return res.status(409).send({ message: 'Email already in use.' })
        }
        db.User.create(req.body)
        .then((newUser: User) => {
            let token: string = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 1 //Expires in one hour
            })
            res.send({ token })
        })
        .catch((err: any) => {
            console.log('Error when creating user.', err)
            res.status(500).send({ message: 'Error when creating user.'})
        })
    })
    .catch((err: any) => {
        console.log('Error occured on signup: ', err)
        res.status(503).send({ message: 'Database Error.' })
    })
})


module.exports = router