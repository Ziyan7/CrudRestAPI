const mongoose = require("mongoose");

//creation of schema for note collection
const UserSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    MobileNumber : Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserInfo", UserSchema);

// Create a User Info
const createNewUserId = (name,age,number,callback) => {
    const user = new User({
        name: name ,
        age: age,
        MobileNumber : number
    });
    // Save User Info in the database
    return user.save((error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /*
function to retrieve all notes from the database
*/
const findUsers = (callback) => {
  User.find( (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

const findOneUserId = (id,callback)=>{
  User.findById(id,(error,data)=>{
    return error ? callback(error,null) : callback(null,data);
  });
};

const findUpdateId = (id,name, age, number, callback) => {
  return User.findByIdAndUpdate(
    id,
    { name: name, 
      age: age, 
      number:number},
    { new: true },
    (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    }
  );
};

  /*Remove an user info using the userID
  and returns a callback
 */
 const deleteUsingId = (id, callback) => {
  return User.findByIdAndDelete(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

  module.exports = {createNewUserId,findUsers, findOneUserId, findUpdateId,deleteUsingId};