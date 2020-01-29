require('dotenv').config()
// Declare variables, import dependencies
let db = require('../models')
let jwt = require('jsonwebtoken')
import { Request, Response, Router } from 'express'
import User from '../models/user'

const router = Router()

router.get('/:id', (req: Request, res: Response) => {
    db.User.findOne({_id: (req.params as{id: string}).id })
    .then((user: User) => {
        res.send({user})
    })
})

router.put('/', (req: Request, res: Response) => {
    //this needs coverage to handle blank fields. User should be able to update just one field, if they so desire.
    db.User.updateOne({ _id: (req.body as{id: string}).id },
    req.body)
    .then((user: User) => {
        res.send({ user })
    })
})

module.exports = router