const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("../../utility/jwt");

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

/**
 * Hashing password using bcrypt library
 */
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

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
 *@description Function for forgot user password
 * @param {email} body
 * @param {callback} callback
 * @returns error or token
 */
const forgotPassword = (body, callback) => {
  return User.findOne({ email: body.email }, (error, data) => {
    if (!data || error) {
      return callback("email id not present", null);
    } else {
      var token = jwt.generateToken(body.email);
      data.resetlink = token;
      return callback(null, data);
    }
  });
};

/**
 * @description Function for user password reset
 * @param {callback} callback
 * @returns error or data
 */
const resetPassword = (reset, callback) => {

  return User.findOne({ email: reset.email }, (error, data) => {
    if (data) {
      data.password = reset.password;
      data.save();
      return callback(null, data);
    } else return callback(error, null);
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

  /**
   * @description Save User Info in the database
   * @param {callback} callback
   * @returns error or data
   */
  return user.save((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 *@description model function for finding all user in database
 * @param {callback} callback
 * @returns error or data
 */
const findUsers = (callback) => {
  User.find((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description function to retrieve particular User Info from the database 
using userid
 * @param {ObjectId} id 
 * @param {callback} callback 
 */
const findOneUserId = (id, callback) => {
  User.findById(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description function to update particular User Info from the database 
using userid
 * @param {Object} Userinfo 
 * @param {callback} callback 
 * @returns error or data
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

/**
 * @description Remove an user info using the userID
  and returns a callback
 * @param {ObjectId} id 
 * @param {callback} callback 
 * @returns error or data
 */
const deleteUsingId = (id, callback) => {
  return User.findByIdAndDelete(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

module.exports = {
  loginUser,
  forgotPassword,
  resetPassword,
  createNewUserId,
  findUsers,
  findOneUserId,
  findUpdateId,
  deleteUsingId,
};
