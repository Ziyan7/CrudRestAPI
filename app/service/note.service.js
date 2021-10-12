const {
  createNote,
  findNotes,
  findIdNote,
  updateById,
  deleteNote,
} = require("../model/note.model.js");

//intermediate function to create new note
const createNewNote = (title, content) => {
  let note = createNote(title, content);
  return note;
};

//intermediate function to get all notes
const findMyNote = (callback) => {
  findNotes((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

//intermediate function to get note based noteID
const findOneNote = (id) => {
  let findByNote = findIdNote(id);
  return findByNote;
};

//intermediate function to update note based noteID
const updateByNote = (title, content,id) => {
  let updateMyNote = updateById(title, content,id);
  return updateMyNote;
};

//intermediate function to delete note based noteID
const deleteMyNote = (id) => {
  let updateMyNote = deleteNote(id);
  return updateMyNote;
};
module.exports = {
  createNewNote,
  findMyNote,
  findOneNote,
  updateByNote,
  deleteMyNote,
};
