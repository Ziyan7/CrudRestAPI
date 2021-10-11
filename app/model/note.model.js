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
    title: title || "Untitled Note",
    content: content,
  });
  // Save Note in the database
  return note.save();
};

/*
function to retrieve all notes from the database
Since find uses promise then and catch is returned 
*/
const findNotes = (callback) => {
  Note.find({},(error,data)=>{
    return error ? callback(error,null) : callback(null,data) ;
  });
};

/*
function to retrieve note from the database based on noteID
Since find uses promise, then and catch is returned 
*/
const findIdNote = (req, res) => {
  return Note.findById(req.params.noteId);
};

const updateById = (req, res) => {
  var update = Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content,
    },
    { new: true }
  );
  return update;
};

const deleteNote = (req,res)=>{
  var deleteId = Note.findByIdAndRemove(req.params.noteId);
  return deleteId;
}

module.exports = { createNote, findNotes, findIdNote, updateById , deleteNote};
