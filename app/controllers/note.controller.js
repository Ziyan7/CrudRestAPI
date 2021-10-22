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
  let title = req.body.title;
  let content = req.body.content;
  var newNote = createNewNote(title, content);

  newNote
    .then((result) => {
      res.status(200).json({
        message: "created note successfully",
        createdNote: {
          title: req.body.title,
          content: req.body.content,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

/**
 * @description Retrieve and return all notes from the database.
 * @param {Object} req
 * @param {Object} res
 */
exports.findAll = (req, res) => {
  findMyNote((error, data) => {
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
  var id = req.params.noteId;
  var findById = findOneNote(id);
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
  let title = req.body.title;
  let content = req.body.content;
  let id = req.params.noteId;
  var updateNote = updateByNote(title, content, id);
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
  const deleteById = deleteMyNote(id);
  deleteById
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
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
