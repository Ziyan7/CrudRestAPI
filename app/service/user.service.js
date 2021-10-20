const {loginUser,
  createNewUserId,
  findUsers,
  findOneUserId,
  findUpdateId,
  deleteUsingId,
} = require("../model/user.model.js");
const jwt = require("../../utility/jwt");

/**
 * function to valiadet password 
 * based on validation token is generated
 * @param {request} body 
 * @param {callaback} callback 
 */
const loginUserCheck = (body, callback) => {
  loginUser(body, (error, data) => {
    if (error) {
      return callback(error, null);
    } else {
      if (body.password == data.password) {
        var token = jwt.generateToken(body.email);
        var result = data + "Token:" + token;
        return callback(null, result);
      } else {
        return callback("incorrect password");
      }
    }
  });
};

//Intermediate function to create new User Info
const createNewUser = (Userinfo, callback) => {
  createNewUserId(Userinfo, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

//intermediate function to get all Userinfo
const findAlltheUsers = (callback) => {
  findUsers((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*intermediate function to get particular Userinfo 
based on userId
*/
const findOneUser = (id, callback) => {
  findOneUserId(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*intermediate function to update particular Userinfo 
based on userId
*/
const updateUser = (Userinfo, callback) => {
  findUpdateId(Userinfo, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*intermediate function to delete particular Userinfo 
based on userId
*/
const deleteById = (findId, callback) => {
  deleteUsingId(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};
module.exports = {loginUserCheck,
  createNewUser,
  findAlltheUsers,
  findOneUser,
  updateUser,
  deleteById,
};
