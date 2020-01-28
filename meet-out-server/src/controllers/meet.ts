require('dotenv').config()
// Declare variables, import dependencies
let db = require('../models')
import { Request, Response, Router } from 'express'
import User from '../models/user'
import Meet from '../models/meet'
const axios = require('axios'); 
const GEO_URL = 'https://geocoding.geo.census.gov/geocoder/locations/address?street='

const router = Router()

// Get route sends all Meets to the front-end
router.get('/', (req: Request, res: Response) => {
    db.Meet.find()
    .then((meets: Meet) => {
        console.log(`All meets should be sent: ${meets}`)
        res.send({meets})
    })
})

// This route gets just one meeting by it's ID
router.get('/:id', (req: Request, res: Response) => {
    db.Meet.findOne({_id: req.params.id})
    .then((meet: Meet) => {
        console.log(`Should be displaying one meet: ${meet}`)
        res.send({meet})
    })
})

// router.get('/', (req: Request, res: Response) => {
//     db.Meet.find({})
// })

// This route posts a new meet
router.post('/', (req: Request, res: Response) => {
    // Defining the activity address to a more bite-sized variable for the geocoder
    let address = req.body.activityAddress
    axios.get(GEO_URL + `${address.split(' ').join('+')}` + 
        `&city=${req.body.city}&state=${req.body.state}&zip=${req.body.zip}` + 
        `&benchmark=Public_AR_Census2010&format=json`)
        .then(function(apiResponse: any){
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
                console.log(`New meet created: ${newMeet}`)
                res.send({newMeet})
            })
        })
    .catch((err: Error) => {
        console.log(err)
        res.send('Error creating event!')
    })
})

router.delete('/:id', (req: Request, res: Response) => {
    db.Meet.deleteOne({_id: req.params.id})
    .then(() => {
        res.render('/')
    })
    .catch((err: Error) => {
        console.log(err)
        res.send('Error deleting event.')
    })
})


module.exports = router