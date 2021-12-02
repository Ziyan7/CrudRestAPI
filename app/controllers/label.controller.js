/**
 * Purpose : handle the requests and sends the response
 * @file : label.controller.js
 * @author  : Abdul Ziyan
 */

const logger = require("../../logger/logger.js");
const {
  createNewLabel,
  findAllLabel,
  findSingleLabel,
  updateLabel,
  deleteSingleLabel,
} = require("../service/label.service.js");

/**
 * @description Create new Label
 * @param {Object} req 
 * @param {Object} res 
 * @returns label or error
 */
exports.create = async (req, res) => {
  let label = req.body.label;
  try {
    var newLabel = await createNewLabel(label);
    return res.status(200).send(newLabel);
  } catch (error) {
    logger.error("Label cannot be created", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

/**
 * @description Retrieve all Labels
 * @param {Object} req 
 * @param {Object} res 
 * @returns label or error
 */
exports.findAll = async (req, res) => {
  try {
    var allLabels = await findAllLabel();
    return res.status(200).send(allLabels);
  } catch (error) {
    logger.error("Labels could not be retrieved", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

/**
* @description Retrieve Label based on Id
 * @param {Object} req 
 * @param {Object} res 
 * @returns label or error 
 */
exports.findOne = async (req, res) => {
  let id = req.params.labelId;
  try {
    var singleLabels = await findSingleLabel(id);
    return res.status(200).send(singleLabels);
  } catch (error) {
    logger.error("Label could not be retrieved", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

/**
 * @description Update Label based on Id
 * @param {Object} req 
 * @param {Object} res 
 * @returns label or error 
 */
exports.update = async (req, res) => {
  let update = {
    label: req.body.label,
    id: req.params.labelId,
  };
  try {
    var newLabel = await updateLabel(update);
    return res.status(200).send({ message: "Updated the Label successfully", label: newLabel });
  } catch (error) {
    logger.error("Labels could not be updated", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

/**
 * 
* @description Delete Labels based on Id
 * @param {Object} req 
 * @param {Object} res 
 * @returns label or error 
 */
exports.delete = async (req, res) => {
  let id = req.params.labelId;
  try {
    var singleLabels = await deleteSingleLabel(id);
    return res
      .status(200)
      .send({ message: "Deleted the Label successfully", label: singleLabels });
  } catch (error) {
    logger.error("Labels could not be deleted", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};
