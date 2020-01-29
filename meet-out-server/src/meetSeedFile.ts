import mongoose from 'mongoose'

const db = require('./models')
db.Meet.create([{
    date: new Date('January 17, 2020 07:00:00'),
    starttime: new Date('January 17, 2020 7:00:00'),
    endtime: new Date('January 17, 2020 9:00:00'),
    description: 'describing my meet',
    users: ['5e31ca382619e7073833bc32'],
    activity: {
        name: 'running',
        locations: {
          name: 'Burke Gilman Trail',
          address: '3901 Fremont Ave N',
          city: 'Seattle',
          state: 'WA',
          zip: 98103,
          lat: 47.6062,
          long: 122.3321
        }
      }
}, {
    date: new Date('January 27, 2020 12:00:00'),
    starttime: new Date('January 27, 2020 12:00:00'),
    endtime: new Date('January 12, 2020 15:00:00'),
    description: "let's go biking!",
    users: ['5e31ca382619e7073833bc32', '5e31c98e2619e7073833bc2f'],
    activity: {
        name: 'biking',
        locations: {
        name: 'Burke Gilman Trail',
        address: '3901 Fremont Ave N',
        city: 'Seattle',
        state: 'WA',
        zip: 98103,
        lat: 47.6062,
        long: 122.3321
    }
  }
},
{
    date: new Date('January 30, 2020 18:00:00'),
    starttime: new Date('January 30, 2020 18:00:00'),
    endtime: new Date('January 30, 2020 20:00:00'),
    description: "kayaking is fun!",
    users: ['5e31ca382619e7073833bc32', '5e31c98e2619e7073833bc2f'],
    activity: {
        name: 'biking',
        locations: {
<<<<<<< HEAD
          name: 'General Assembly',
          address: '1218 3rd Ave',
          city: 'Seattle',
          state: 'WA',
          zip: 98101,
          lat: 50.6062,
          long: 140.3321
=======
        name: 'General Assembly',
        address: '1218 3rd Ave',
        city: 'Seattle',
        state: 'WA',
        zip: 98101,
        lat: 50.6062,
        long: 140.3321
>>>>>>> b0ac4bdc28742a7d32478f2567c87f566f7c4798
    }
  }
}
]
)