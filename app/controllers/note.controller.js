const logger = require("../../logger/logger.js");
const {
  createNewNote,
  findMyNote,
  findOneNote,
  updateByNote,
  deleteMyNote,
} = require("../service/note.service.js");

/**
 * @description Handles the request and response for creating a note
 * @param {Object} req
 * @param {Object} res
 */
exports.create = (req, res) => {
  let notes = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.UserId,
    isTrash :req.body.isTrash, 
    color : req.body.color,
    image : req.body.image
  };
  var newNote = createNewNote(notes);

  newNote
    .then((result) => {
      res.status(200).json({
        message: "created note successfully",
        createdNote: {
          title: req.body.title,
          content: req.body.content,
          isTrash :req.body.isTrash
        },
        note : result
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the Note.",
      });
    });
};

/**
 * @description Retrieve and return all notes from the database.
 * @param {Object} req
 * @param {Object} res
 */
exports.findAll = (req, res) => {
  UserId = req.body.UserId;
  findMyNote(UserId,(error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving notes.",
      });
    }
    res.send(data);
  });
};

/**
 * @description Find a single note with a noteId
 * @param {Object} req
 * @param {Object} res
 */

exports.findOne = (req, res) => {
  let id = req.params.noteId;
  UserId = req.body.UserId;
  var findById = findOneNote(id,UserId);
  findById
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      logger.error("Note not found with id " + req.params.noteId);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId,
      });
    });
};

/**
 * @description Update a note identified by the noteId in the request
 * @param {Object} req
 * @param {Object} res
 */
exports.update = (req, res) => {
  let update = {
    title : req.body.title,
    content : req.body.content,
    id : req.params.noteId,
    UserId : req.body.UserId,
    isTrash : req.body.isTrash,
    color : req.body.color,
    image : req.body.image
  }
  
  var updateNote = updateByNote(update);
  updateNote
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      logger.error("Note not found with id " + req.params.noteId);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};

/**
 * @description Delete a note with the specified noteId in the request
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = (req, res) => {
  var id = req.params.noteId;
  UserId = req.body.UserId;
  const deleteById = deleteMyNote(id,UserId);
  deleteById
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!",note :note });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
