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
    return await createLabel(label);
     
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
    return await findLabels();
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
    return await findOneLabel(id);
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
    return await updateUserLabel(update); 
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
    return await deleteOneLabel(id);
   
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
