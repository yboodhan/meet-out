require('dotenv').config()
// Declare variables, import dependencies
let db = require('../models')
let jwt = require('jsonwebtoken')
import { Request, Response, Router } from 'express'
import User from '../models/user'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
    // Declare email & password to pack them into a bite-sized bit
    const email = (req.body as {email: string}).email
    const password = (req.body as {password: string}).password
    // Email: Email is confusing to read, but it's simply saying that we're searching our database to find
    // an email that matches the input email
    db.User.findOne({ email: email })
    .then((user: User) => {
        // If the user isn't found, or if the password isn't valid...
        if(!user || !user.password){
            return res.status(404).send({message: 'User not found'})
        }
        // Checking for password validity: user exists and matches, but does password match to the user?
        if(!user.isValidPassword(user, password)){
            return res.status(401).send({message: 'Invalid Credentials'})
        }
        // Assign the token, assign the expiration
        let token: string = jwt.sign(user.toJSON(), process.env.REACT_APP_JWT_SECRET, {
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
    // Can't declare email & password as global constants, they depend on req
    const email = (req.body as {email: string}).email
    db.User.findOne({ email: email})
    .then((user: User) => {
        // If we've found a user that already exists with the email provided...
        if(user) {
            return res.status(409).send({ message: 'Email already in use.' })
        }
        // Otherwise, create the user, a token, and assign the token.
        db.User.create(req.body)
        .then((newUser: User) => {
            let token: string = jwt.sign(newUser.toJSON(), process.env.REACT_APP_JWT_SECRET, {
                expiresIn: 60 * 60 * 1 //Expires in one hour
            })
            res.send({ token })
        })
        .catch((err: any) => {
            console.log('Error when creating user.', err)
            res.status(500).send({ message: 'Error when creating user.'})
        })
    })
    //added this
    .catch((err: any) => {
        console.log('Error occured on signup: ', err)
        res.status(503).send({ message: 'Database Error.' })
    })
})


module.exports = router