import * as mongoose from 'mongoose'
import User from '../models/user'

//create interface for meet type extending mongoose.Document (mongoose.Document includes ._id)
export default interface Meet extends mongoose.Document {
  date: Date;
  time: Date;
  description: String;
  users: User[];
  activity: { name: String;
    locations: {
      name: String;
      address: String;
      lat: Number;
      long: Number;
    }[];
  }
}

//create activity schema
let activitySchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  locations: [{
    name: String,
    address: String,
    lat: Number,
    long: Number
  }]
})

//create meet schema
let meetSchema: mongoose.Schema = new mongoose.Schema({
  date: Date,
  time: Date,
  description: String,
  //reference user as array
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  //embed activity schema
  activity: activitySchema
})

// Create model with type meet
let Meet: mongoose.Model<Meet> = mongoose.model<Meet>('Meet', meetSchema)

module.exports = Meet;