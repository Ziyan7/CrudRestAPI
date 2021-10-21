
const express = require('express');
// create express app
const app = express();

// Configuring the database
const connect = require('./config/db.config.js');

//import logger
const logger = require('./logger/logger.js')

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

// Require Notes routes
require('./app/routes/note.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

  
// listen for requests
app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
    connect();
});