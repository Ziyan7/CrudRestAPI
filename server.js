const express = require("express");
const cors = require("cors")
require('dotenv').config();
const PORT = process.env.PORT ;
// create express app
const app = express();
app.use(
  cors()
)

// Configuring the database
const connect = require("./config/db.config.js");

//import logger
const logger = require("./logger/logger.js");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

// Require Notes routes
require("./app/routes/note.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/label.routes.js")(app);


// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

app.use(express.static("uploads"))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// listen for requests
app.listen(PORT, () => {
  logger.info("Server is listening on port 9000");
  connect();
});

module.exports = app