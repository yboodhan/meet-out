import mongoose from 'mongoose'

const db = require('./models')
db.Meet.create([{
    creator: '5e2fc7e5555d613b5454aaf5',
    private: true,
    date: new Date('January 17, 2020 07:00:00'),
    starttime: new Date('January 17, 2020 7:00:00'),
    endtime: new Date('January 17, 2020 9:00:00'),
    description: 'describing my meet',
    users: ['5e2fc7e5555d613b5454aaf5'],
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
    creator: '5e2fc7e5555d613b5454aaf5',
    private: false,
    date: new Date('January 12, 2020 12:00:00'),
    starttime: new Date('January 12, 2020 12:00:00'),
    endtime: new Date('January 12, 2020 15:00:00'),
    description: "let's go biking!",
    users: ['5e2fc7e5555d613b5454aaf5', '5e2fc87c94fe903b8674fe47'],
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
    creator: '5e2fc87c94fe903b8674fe47',
    private: false,
    date: new Date('January 30, 2020 18:00:00'),
    starttime: new Date('January 30, 2020 18:00:00'),
    endtime: new Date('January 30, 2020 20:00:00'),
    description: "kayaking is fun!",
    users: ['5e2fc87c94fe903b8674fe47', '5e2fc96822a4423bd1f4e176', '5e2fc7e5555d613b5454aaf5'],
    activity: {
        name: 'kayaking',
        locations: {
        name: 'General Assembly',
        address: '1218 3rd Ave',
        city: 'Seattle',
        state: 'WA',
        zip: 98101,
        lat: 50.6062,
        long: 140.3321
    }
  }
},
{
  creator: '5e2fc96822a4423bd1f4e176',
  private: true,
  date: new Date('January 6, 2020 18:00:00'),
  starttime: new Date('January 6, 2020 18:00:00'),
  endtime: new Date('January 6, 2020 20:00:00'),
  description: "I hate rowing!",
  users: ['5e2fc96822a4423bd1f4e176'],
  activity: {
      name: 'rowing',
      locations: {
      name: 'General Assembly',
      address: '1218 3rd Ave',
      city: 'Seattle',
      state: 'WA',
      zip: 98101,
      lat: 50.6062,
      long: 140.3321
  }
}
},
{
  creator: '5e2fc96822a4423bd1f4e176',
  private: false,
  date: new Date('January 6, 2020 16:00:00'),
  starttime: new Date('January 6, 2020 16:00:00'),
  endtime: new Date('January 6, 2020 18:00:00'),
  description: "YOGA",
  users: ['5e2fc96822a4423bd1f4e176'],
  activity: {
      name: 'yoga',
      locations: {
      name: 'General Assembly',
      address: '1218 3rd Ave',
      city: 'Seattle',
      state: 'WA',
      zip: 98101,
      lat: 50.6062,
      long: 140.3321
  }
}
}
]
)