const logger  = require("../../logger/logger");
const jwt = require("../../utility/jwt");

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      res.send("Token is empty");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verifyToken(token, (error, data) => {
      if (error) {
        return res.send(error);
      }
      next();
    });
  };

const validate = (req, res, next) => {
    // check if title is present
    if(!req.body.title) {
        logger.error("Note content can not be empty")
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    //check if content is present
    if(!req.body.content) {
        logger.error("Note content can not be empty")
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    next();
}
module.exports = {validate,ensureToken};
