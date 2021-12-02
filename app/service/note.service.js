/**
 * Purpose : Services contain all business logic and returns objects or throws errors to the controller
 * @file : note.service.js
 * @author  : Abdul Ziyan
 */

const {
  createNote,
  findNotes,
  findIdNote,
  updateById,
  deleteNote,
} = require("../model/note.model.js");

/**
 * @description intermediate function to create new note
 * @param {object} notes 
 * @returns data or error
 */

const createNewNote = (notes) => {
  return createNote(notes)
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * @description intermediate function to get all notes
 * @param {object} UserId  
 */
const findMyNote = (UserId, callback) => {
  findNotes(UserId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description intermediate function to get note based noteID
 * @param {Object} id 
 * @param {Object} UserId 
 * @returns  data or error
 */
const findOneNote = (id, UserId) => {
  return findIdNote(id, UserId)
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * @description intermediate function to update note based noteID
 * @param {Object} update 
 * @returns data or error
 */
const updateByNote = (update) => {
  return updateById(update)
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * @description intermediate function to delete note based noteID
 * @param {Object} id 
 * @param {Object} UserId 
 * @returns 
 */
const deleteMyNote = (id,UserId) => {
  return deleteNote(id,UserId)
  .then((note) => {
    return note;
  })
  .catch((error) => {
    throw error;
  });
};
module.exports = {
  createNewNote,
  findMyNote,
  findOneNote,
  updateByNote,
  deleteMyNote,
};
