const {
  createNote,
  findNotes,
  findIdNote,
  updateById,
  deleteNote,
} = require("../model/note.model.js");

//intermediate function to create new note
const createNewNote = (notes) => {
  return createNote(notes)
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

//intermediate function to get all notes
const findMyNote = (UserId, callback) => {
  findNotes(UserId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

//intermediate function to get note based noteID
const findOneNote = (id, UserId) => {
  return findIdNote(id, UserId)
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

//intermediate function to update note based noteID
const updateByNote = (update) => {
  return updateById(update)
    .then((note) => {
      return note;
    })
    .catch((error) => {
      throw error;
    });
};

//intermediate function to delete note based noteID
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
