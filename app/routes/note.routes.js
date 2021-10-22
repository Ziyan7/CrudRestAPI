const notes = require('../controllers/note.controller.js');
const {validate,ensureToken} = require('../middleware/note.middleware.js');

module.exports = (app) => {
    // Create a new Note
    app.post('/notes',ensureToken,validate, notes.create);

    // Retrieve all Notess
    app.get('/notes',ensureToken, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId',ensureToken, notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId',ensureToken,validate, notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId',ensureToken, notes.delete);
};

