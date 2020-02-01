import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

import Meet from '../models/meet'

//create interface for User extending mongoose.Document (mongoose.Document includes ._id)
export default interface User extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  photo: string;
  meets: Meet[];
  _v: number;
  isValidPassword(user: User, password: string): boolean;
}

//create user schema
let userSchema: mongoose.Schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32
      },
      photo: String,
      meets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Meet'}]
})


// Use bcrypt to hash password before it goes into the database
userSchema.pre('save', function(this: User, next) {
  // if(!this.isModified()){ --- *TESTED and doesn't seem like we need this... at least for now
    this.password = bcrypt.hashSync(this.password, 12)
  // }
  next()
})

// Ensure that password doesn't get sent with the rest of the data
userSchema.set('toJSON', {
  transform: (doc, user: User) => {
    delete user.password
    delete user._v
    return user
  }
})

// helper function to compare the password hashes
userSchema.methods.isValidPassword = function(user: User, typedPassword: string): boolean {
  return bcrypt.compareSync(typedPassword, user.password)
}

// Create model with type User
let User: mongoose.Model<User> = mongoose.model<User>('User', userSchema)

module.exports = User