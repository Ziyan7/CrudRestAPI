const mongoose = require("mongoose");

//creation of schema for note collection
const UserSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    mobileNumber: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserInfo", UserSchema);

  /**
   * request body contails email and password
   * user registration is checked based on email using @findOne inbuilt function
   * @param {request} body 
   * @param {callback} callback 
   * @returns data if login is successful or returns error
   */
  const loginUser = (body, callback) => {
    return User.findOne({ email: body.email }, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * Function to register new user 
 * @param {request body} userInfo 
 * @param {callback} callback 
 * @returns succesfull registration or error
 */
const createNewUserId = (userInfo, callback) => {
  const user = new User({
    name: userInfo.name,
    age: userInfo.age,
    mobileNumber: userInfo.number,
    email: userInfo.email,
    password: userInfo.password,
  });
  // Save User Info in the database
  return user.save((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*
function to retrieve all User Info from the database
*/
const findUsers = (callback) => {
  User.find((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*
function to retrieve particular User Info from the database 
using userid
*/
const findOneUserId = (id, callback) => {
  User.findById(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*
function to update particular User Info from the database 
using userid
*/
const findUpdateId = (Userinfo, callback) => {
  return User.findByIdAndUpdate(
    Userinfo.id,
    {
      name: Userinfo.name,
      age: Userinfo.age,
      number: Userinfo.number,
      email: Userinfo.email,
      password: Userinfo.password,
    },
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

module.exports = {loginUser,
  createNewUserId,
  findUsers,
  findOneUserId,
  findUpdateId,
  deleteUsingId,
};
