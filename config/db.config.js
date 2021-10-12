// Connecting to the database
const mongoose = require('mongoose');
const logger = require('./../logger/logger.js')
const dbConfig = require('./database.config.js');
const dbconnect = () =>{
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");  
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

module.exports = dbconnect;