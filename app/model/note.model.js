/**
 * Purpose : The schema definition of the Model
 * @file : note.model.js
 * @author  : Abdul Ziyan
 */


const mongoose = require("mongoose");

/**
 * @description creation of schema for note collection
 * @requires mongoose
 */
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "UserInfo" },
    isTrash : Boolean ,
    color : String,
    image : String
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);


/**
 * @description Create a Note
 * @param {Object} notes 
 * @returns data or error
 */
const createNote = (notes) => {
  const note = new Note({
    title: notes.title,
    content: notes.content,
    UserId: notes.userId,
    isTrash : notes.isTrash,
    color : notes.color,
    image: notes.image
  });
  // Save Note in the database
  return note
    .save()
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * @description function to retrieve all notes from the database
 * @param {ObjectId} UserId 
 * @param {callback} callback 
 */
const findNotes = (UserId, callback) => {
  Note.find({ UserId: UserId })
    .populate({ path: "UserId", select: ["email"] })
    .exec((error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
};

/**
 * @description function to retrieve note from the database based on noteID
 * @param {ObjectId} id 
 * @param {ObjectId} UserId 
 * @returns data or error
 */
const findIdNote = (id, UserId) => {
  return Note.findById(id)
    .find({ UserId: UserId })
    .populate({
      path: "UserId",
      select: ["email "],
    })
    .then((data) => {
      if (data.length == 0) {
        throw "Error retrieving note";
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * @description function to update note in the database based on noteID
 * @param {Object} update 
 * @returns data or error
 */
const updateById = (update) => {
  return Note.findById(update.id)
    .findOneAndUpdate(
      {UserId:update.UserId},
      {
        title: update.title,
        content: update.content,
        isTrash :update.isTrash,
        color : update.color,
        image : update.image
      },
      { new: true }
    )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * @description function to delete note in the database based on noteID
 * @param {ObjectID} id 
 * @param {ObjectId} UserId 
 * @returns  data or error
 */
const deleteNote = (id,UserId) => {
  return Note.findById(id,UserId)
  .findOneAndRemove({UserId:UserId})
  .then((data) => {
    return data;
  })
  .catch((error) => {
    throw error;
  });
  
};

module.exports = { createNote, findNotes, findIdNote, updateById, deleteNote };
