/**
 * Purpose : Services contain all business logic and returns objects or throws errors to the controller
 * @file : label.service.js
 * @author  : Abdul Ziyan
 */

const {
  createLabel,
  findLabels,
  findOneLabel,
  updateUserLabel,
  deleteOneLabel,
} = require("../model/label.model.js");

/**
 * @description intermediate function to save label
 * @param {Object} label
 * @returns label or error
 */
const createNewLabel = async (label) => {
  try {
    const createUserNote = await createLabel(label);
    return createUserNote;
  } catch (error) {
    throw error;
  }
};
/**
 * @description intermediate function to retrieve all labels
 * @returns label or error
 */
const findAllLabel = async () => {
  try {
    const userLabel = await findLabels();
    return userLabel;
  } catch (error) {
    throw error;
  }
};

/**
 * @description intermediate function to retrieve labels based on ObjectId
 * @param {ObjectId} id
 * @returns label or error
 */
const findSingleLabel = async (id) => {
  try {
    const userLabel = await findOneLabel(id);
    return userLabel;
  } catch (error) {
    throw error;
  }
};

/**
 * @description intermediate function to upadate label based on ObjectId
 * @param {Object} update 
 * @returns label or error
 */
const updateLabel = async (update) => {
  try {
    const updateUserNote = await updateUserLabel(update);
    return updateUserNote;
  } catch (error) {
    throw error;
  }
};

/**
 * @description intermediate function to delete label based on ObjectId
 * @param {ObjectId} id 
 * @returns 
 */
const deleteSingleLabel = async (id) => {
  try {
    const userLabel = await deleteOneLabel(id);
    return userLabel;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewLabel,
  findAllLabel,
  findSingleLabel,
  updateLabel,
  deleteSingleLabel,
};
