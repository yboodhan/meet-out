require('dotenv').config()
// Declare variables, import dependencies
let db = require('../models')
import { Request, Response, Router } from 'express'
import User from '../models/user'
import Meet from '../models/meet'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    db.Meet.find()
    .then((meet: Meet) => {
        res.send(`Found: ${meet}`)
    })
})

router.post('/', (req: Request, res: Response) => {
    // const meetActivity = (req.body as {activityName: string}).activityName
    db.Meet.create(req.body)
    .then((newMeet: Meet) => {
        res.send(`Created: ${newMeet}`)
    })
    .catch((err: Error) => {
        console.log(err)
    })
})


module.exports = router