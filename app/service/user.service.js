const {
  createNewUserId,
  findUsers,
  findOneUserId,
  findUpdateId,
  deleteUsingId,
} = require("../model/user.model.js");

//Intermediate function to create new User Info
const createNewUser = (name, age, number, callback) => {
  createNewUserId(name, age, number, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

//intermediate function to get all Userinfo
const findMyUsers = (callback) => {
  findUsers((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*intermediate function to get particular Userinfo 
based on userId
*/
const findOneUser = (id, callback) => {
  findOneUserId(id, (error, data) => {
    console.log(error)
    return error ? callback(error, null) : callback(null, data);
  });
};

/*intermediate function to update particular Userinfo 
based on userId
*/
const updateUser = (id, name, age, number, callback) => {
  findUpdateId(id, name, age, number, (error, data) => {
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
module.exports = {
  createNewUser,
  findMyUsers,
  findOneUser,
  updateUser,
  deleteById,
};
