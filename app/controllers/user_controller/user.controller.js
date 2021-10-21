const {
  loginUserCheck,
  createNewUser,
  findAlltheUsers,
  findOneUser,
  updateUser,
  deleteById,
} = require("../../service/user.service.js");
const logger = require("../../../logger/logger.js");
const statusObject = require("./user.responseSchema");
//const mail = require("../../../utility/nodemailer")
let responseStatus;

/**
 * login user
 * @loginUsercheck is exported from the serice layer
 * @param {Object} req 
 * @param {object} res 
 */
exports.loginUser = (req, res) => {
  let body = req.body;
  loginUserCheck(body, (error, data) => {
    if (error) {
      logger.error(error);
      responseObject = statusObject.userApiFailure;
      responseObject.message = error;
      return res.send(responseObject);
    }
    logger.info("login Successful");
    //mail.mailer();
    responseObject = statusObject.userApiSuccess;
    responseObject.message = data;
    res.send(responseObject);
  });
};

/**
 * to create new userInfo
 * @param {Object} req 
 * @param {Object} res 
 */
exports.create = (req, res) => {
  let userInfo = {
    name: req.body.name,
    age: req.body.age,
    number: req.body.mobileNumber,
    email: req.body.email,
    password: req.body.password,
  };

  createNewUser(userInfo, (error, data) => {
    if (error) {
      logger.error(error);
      responseStatus = statusObject.userApiFailure;
      responseStatus.message = error;
      return res.send(responseStatus);
    }
    logger.info("login Successful");
    responseStatus = statusObject.userApiSuccess;
    responseStatus.message = data;
    res.send(responseStatus);
  });
};

/**
 * Retrieve and return all UserInfo from the database.
 * @param {Object} req 
 * @param {Object} res 
 */
exports.findAll = (req, res) => {
  findAlltheUsers((error, data) => {
    if (error) {
      logger.error(error);
      responseStatus = statusObject.userApiFailure;
      responseStatus.message = error;
      return res.send(responseStatus);
    }
    res.send(data);
  });
};

/**
 * Retrieve and return UserInfo from the database based on the id
 * @param {Object} req 
 * @param {Object} res 
 */
exports.findOne = (req, res) => {
  let id = req.params.userId;
  findOneUser(id, (error, data) => {
    if (error) {
      logger.error(error);
      if (error.kind === "ObjectId") {
        responseStatus = statusObject.userApiFindFailure;
        responseStatus.message = error.message;
        return res.send(responseStatus);
      }
      responseStatus = statusObject.userApiFailure;
      responseStatus.message = error.message;
      return res.send(responseStatus);
    }
    if (!data) {
      responseStatus = statusObject.userApiFindFailure;
      return res.send(responseStatus);
    }
    logger.info("Retrieval Successful");
    responseStatus = statusObject.userApiSuccess;
    responseStatus.message = data;
    res.send(responseStatus);
  });
};

/**
 * Update a Userinfo based on the userId 
 with request and response as parameters
 * @param {object} req 
 * @param {object} res 
 */
exports.update = (req, res) => {
  let userInfo = {
    name: req.body.name,
    age: req.body.age,
    number: req.body.mobileNumber,
    email: req.body.email,
    password: req.body.password,
    id: req.params.userId,
  };

  updateUser(userInfo, (error, data) => {
    if (error) {
      logger.error(error);
      if (error.kind === "ObjectId") {
        responseStatus = statusObject.userApiFindFailure;
        responseStatus.message = error.message;
        return res.send(responseStatus);
      }
      responseStatus = statusObject.userApiFailure;
      responseStatus.message = error.message;
      return res.send(responseStatus);
    }
    if (!data) {
      responseStatus = statusObject.userApiFindFailure;
      return res.send(responseStatus);
    }
    logger.info("Updated succesfully");
    responseStatus = statusObject.userApiSuccess;
    responseStatus.message = "Updated Successfully";
    res.send(responseStatus);
  });
};

/**
 * Delete a user ingfo based on userId with
   with request and response as parameters
 * @param {Object} req 
 * @param {Object} res 
 */
exports.delete = (req, res) => {
  let id = req.params.userId;
  deleteById(id, (error, data) => {
    if (error) {
      logger.error(error);
      if (error.kind === "ObjectId") {
        responseStatus = statusObject.userApiFindFailure;
        responseStatus.message = error.message;
        return res.send(responseStatus);
      }
      responseStatus = statusObject.userApiFailure;
      responseStatus.message = error.message;
      return res.send(responseStatus);
    }
    if (!data) {
      responseStatus = statusObject.userApiFindFailure;
      return res.send(responseStatus);
    }
    logger.info("delete succesfully");
    responseStatus = statusObject.userApiSuccess;
    responseStatus.message = "deleted successfully";
    res.send(responseStatus);
  });
};
