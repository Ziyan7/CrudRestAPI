const {createNote,findNotes , findIdNote, updateById , deleteNote} = require('../model/note.model.js');

//intermediate function to create new note
const createNewNote = (title,content)=>{
    let note = createNote(title,content)  ;
    return note;
}

//intermediate function to get all notes
const findMyNote=(callback)=>{
    findNotes((error,data)=>{
        return error ? callback(error,null) : callback(null,data) ;
    })
};

//intermediate function to get note based noteID
const findOneNote = (req,res)=>{
    let findByNote = findIdNote(req,res);
    return findByNote; 
}

//intermediate function to update note based noteID
const updateByNote = (req,res)=>{
    let updateMyNote = updateById(req,res);
    return updateMyNote; 
}

//intermediate function to delete note based noteID
const deleteMyNote = (req,res)=>{
    let updateMyNote = deleteNote(req,res);
    return updateMyNote; 
}
module.exports = {createNewNote,findMyNote, findOneNote ,updateByNote, deleteMyNote };