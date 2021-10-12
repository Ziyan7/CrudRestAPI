const mongoose = require("mongoose");

//creation of schema for note collection
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

// Create a Note
const createNote = (title, content) => {
  const note = new Note({
    title: title ,
    content: content,
  });
  // Save Note in the database
  return note.save();
};

/*
function to retrieve all notes from the database
find() is returning promise 
*/
const findNotes = (callback) => {
  Note.find( (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*
function to retrieve note from the database based on noteID
Since find uses promise, then and catch is returned 
*/
const findIdNote = (id) => {
  return Note.findById(id);
};

const updateById = (title, content,id) => {
  var update = Note.findByIdAndUpdate(
    id,
    {
      title: title,
      content:content,
    },
    { new: true }
  );
  return update;
};

const deleteNote = (id) => {
  var deleteId = Note.findByIdAndRemove(id);
  return deleteId;
};

module.exports = { createNote, findNotes, findIdNote, updateById, deleteNote };
