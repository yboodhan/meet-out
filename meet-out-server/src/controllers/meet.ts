require('dotenv').config()
// Declare variables, import dependencies
let db = require('../models')
import { Request, Response, Router } from 'express'
import User from '../models/user'
import Meet from '../models/meet'
const axios = require('axios'); 
const GEO_URL = 'https://geocoding.geo.census.gov/geocoder/locations/address?street='

const router = Router()

router.get('/', (req: Request, res: Response) => {
    db.Meet.find()
    .then((meet: Meet) => {
        res.send(`Found: ${meet}`)
    })
})

router.post('/', (req: Request, res: Response) => {
    let address = req.body.activityAddress
    axios.get(GEO_URL + `${address.split(' ').join('+')}` + 
        `&city=${req.body.city}&state=${req.body.state}&zip=${req.body.zip}` + 
        `&benchmark=Public_AR_Census2010&format=json`)
        .then(function(apiResponse: any){
            console.log(apiResponse.data.result.addressMatches[0].coordinates)
            let x = apiResponse.data.result.addressMatches[0].coordinates.x
            let y = apiResponse.data.result.addressMatches[0].coordinates.y

            db.Meet.create({
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
                users: req.body.users,
                activity: {
                    name: req.body.activityName,
                    locations: {
                        name: req.body.locationName,
                        address: address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        lat: x,
                        long: y
                    }
                }
            })
            .then((newMeet: Meet) => {
                res.send(`Created: ${newMeet}`)
            })
        })
    .catch((err: Error) => {
        console.log(err)
    })
})


module.exports = router