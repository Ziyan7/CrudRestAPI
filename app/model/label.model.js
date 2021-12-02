/**
 * Purpose : The schema definition of the Model
 * @file : label.model.js
 * @author  : Abdul Ziyan
 */

const mongoose = require("mongoose");

/**
 * @description creation of schema for label collection
 * @requires mongoose
 */
const LabelSchema = mongoose.Schema(
  {
    label: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @description Save newly created label in db
 */
const Label = mongoose.model("Label", LabelSchema);
const createLabel = async (data) => {
  const newLabel = new Label({
    label: data,
  });

  try {
    // Save Label in the database
    const saveLabel = await newLabel.save();
    return saveLabel;
  } catch (error) {
    throw error;
  }
};

/**
 * @description find all the label in the db
 * @returns label or error
 */
const findLabels = async () => {
  try {
    const allLabels = await Label.find();
    return allLabels;
  } catch (error) {
    throw error;
  }
};

/**
 * @description find label based on ObjectId
 * @param ObjectId} id
 * @returns label or error
 */
const findOneLabel = async (id) => {
  try {
    const singleLabels = await Label.findById(id);
    return singleLabels;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Update label based on ObjectId
 * @param {Object} update 
 * @returns label or error
 */
const updateUserLabel = async (update) => {
  try {
    let labelUpdate = await Label.findByIdAndUpdate(
      update.id,
      {
        label: update.label,
      },
      { new: true }
    );
    try {
      const saveLabel = await labelUpdate.save();
      return saveLabel;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * @description Delete label based on ObjectId
 * @param ObjectId} id
 * @returns label or error
 */
const deleteOneLabel = async (id) => {
  try {
    const singleLabels = await Label.findByIdAndDelete(id);
    return singleLabels;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createLabel,
  findLabels,
  findOneLabel,
  updateUserLabel,
  deleteOneLabel,
};
