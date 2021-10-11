
const express = require('express');
// create express app
const app = express();

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//import logger
const logger = require('./logger/logger.js')

// app.use(express.urlencoded({
//     extended: false
// }))
app.use(express.json())
// Require Notes routes
require('./app/routes/note.routes.js')(app);

// Connecting to the database
const connect = () =>{
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");  
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
    connect();
});