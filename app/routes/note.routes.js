const notes = require('../controllers/note.controller.js');
const validate = require('../middleware/note.middleware.js');

module.exports = (app) => {
    // Create a new Note
    app.post('/notes',validate, notes.create);

    // Retrieve all Notess
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',validate, notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
};

