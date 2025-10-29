
// A Schema defines the shape of documents in MongoDB

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  age : {
    type : Number
  },
  isAdmin :{
    type : Boolean,
    default : false
  }
}, {
    timestamps : true
})

// mongoose.model(): creates a model we can use it to interact with the collection

const User = mongoose.model("User" , userSchema)

export default User