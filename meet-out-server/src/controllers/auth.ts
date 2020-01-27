require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
import { Request, Response, Router } from 'express'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
    console.log(req.body)
    const email = (req.body as {text: string}).email
    db.User.findOne({email: req.body.email})
})


module.exports = router