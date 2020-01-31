require('dotenv').config()
// Declare variables, import dependencies
let db = require('../models')
let jwt = require('jsonwebtoken')
import { Request, Response, Router } from 'express'
import User from '../models/user'
import Meet from '../models/meet'
const axios = require('axios'); 
const GEO_URL = 'https://geocoding.geo.census.gov/geocoder/locations/address?street='

const router = Router()

// Get route sends all Meets to the front-end
// Add USER model to this so that the front-end can see the user's first name & last name
router.get('/:id', (req: Request, res: Response) => {
    console.log('Reached MEET ROUTE')

    db.User.findById(req.params.id)
    .then((user: User) => {
        console.log(user)
        db.Meet.find({ $or: [{private: false}, {users: {$in: user}}, {creator: user._id}] })
        .populate('users')
        .then((meets: Meet) => {
            console.log('All pertinent meets should be sent')
            console.log('meets are:', meets)
            res.send({meets, user})
        })
        .catch((err: Error) => {
            console.log(`Error: ${err}`)
            res.send({err})
        })
    })
})


router.put('/:id', (req: Request, res: Response) => {
    console.log('getting to put route')
    db.Meet.updateOne({_id: req.params.id}, req.body)
    .then((meet: Meet) => {
        console.log('updated meet!')
        res.send({hi: 'updated the meet'})
    })
    .catch((err: Error) => {
        console.log(`Error: ${err}`)
        res.send({err})
    })
})


// This route posts a new meet
router.post('/', (req: Request, res: Response) => {
    // Defining the activity address to a more bite-sized variable for the geocoder
    let address = req.body.activityAddress
    // Axios call on the US census geocoder turns user input into an address usable by the geocoder
    axios.get(GEO_URL + `${address.split(' ').join('+')}` + 
        `&city=${req.body.city}&state=${req.body.state}&zip=${req.body.zip}` + 
        `&benchmark=Public_AR_Census2010&format=json`)
        // Receives a response from the API call
        .then(function(apiResponse: any){
            // Assigns x & y to the lat & long kicked back off the API
            let x = apiResponse.data.result.addressMatches[0].coordinates.x
            let y = apiResponse.data.result.addressMatches[0].coordinates.y

            // This is where we take all the data harvested off the front end, and actually store it.
            db.Meet.create({
                creator: req.body.creator,
                private: req.body.privateMeet,
                date: req.body.date,
                starttime: req.body.starttime,
                endtime: req.body.endtime,
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
        .catch((err: Error) => {
            console.log(err)
            res.send({err})
        }) 
    })
    .catch((err: Error) => {
        console.log(err)
        res.send('Error creating event!')
    })
})

router.delete('/:id', (req: Request, res: Response) => {
    console.log('Accessed server-side')
    db.Meet.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(204).send()
    })
    .catch((err: Error) => {
        console.log('err in del rte', err)
        res.status(500).send({message: 'Error deleting event.'})
    })
})


module.exports = router