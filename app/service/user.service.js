/**
 * Purpose : Services contain all business logic and returns objects or throws errors to the controller
 * @file : user.service.js
 * @author  : Abdul Ziyan
 */
const {
  loginUser,
  forgotPassword,
  resetPassword,
  createNewUserId,
  findUsers,
  findOneUserId,
  findUpdateId,
  deleteUsingId,
} = require("../model/user.model.js");
const jwt = require("../../utility/jwt");
const bcrypt = require("bcrypt");
const mail = require("../../utility/nodemailer");

/**
 * @description
 * function to validate password
 * based on validation token is generated
 * @param {request} body
 * @param {callback} callback
 */
const loginUserCheck = (body, callback) => {
  loginUser(body, (error, data) => {
    if (error) {
      return callback(error, null);
    } else {
      if (bcrypt.compareSync(body.password, data.password)) {
        var token = jwt.generateToken(body.email,data.id);
        return callback(null, token);
      } else {
        return callback("incorrect password");
      }
    }
  });
};

/**
 * @description
 * function to generate reset password link
 * @param {request} body
 * @param {callaback} callback
 */
const forgotPasswordLink = (body, callback) => {
  forgotPassword(body, (error, data) => {
    if (error) {
      return callback(error, null);
    } else {
      mail.mailer(data, (error, data) => {
        if (error) {
          return callback(error, null);
        } else return callback(null, data);
      });
    }
  });
};

/**
 * @description function to reset password
 * @param {Object} reset 
 * @param {callback} callback 
 */
const resetPasswordLink = (reset, callback) => {
  resetPassword(reset, (error, data) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, data);
    }
  });
};

/**
 * @description Intermediate function to create new User Info
 * @param {callback} callback 
 */
const createNewUser = (Userinfo, callback) => {
  createNewUserId(Userinfo, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description intermediate function to get all Userinfo
 * @param {callback} callback 
 */
const findAlltheUsers = (callback) => {
  findUsers((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description intermediate function to get particular Userinfo 
based on userId
 * @param {callback} callback 
 */
const findOneUser = (id, callback) => {
  findOneUserId(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description intermediate function to update particular Userinfo 
based on userId
 * @param {callback} callback 
 */
const updateUser = (Userinfo, callback) => {
  findUpdateId(Userinfo, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description intermediate function to delete particular Userinfo 
based on userId
 * @param {callback} callback 
 */
const deleteById = (findId, callback) => {
  deleteUsingId(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};
module.exports = {
  loginUserCheck,
  forgotPasswordLink,
  resetPasswordLink,
  createNewUser,
  findAlltheUsers,
  findOneUser,
  updateUser,
  deleteById,
};
