// Connecting to the database
require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./../logger/logger.js')
const dbConfig = require('./database.config.js');
const dbconnect = () =>{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");  
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

module.exports = dbconnect;