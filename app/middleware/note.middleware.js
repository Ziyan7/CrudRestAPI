const logger  = require("../../logger/logger");
const jwt = require("../../utility/jwt");

/**
 * Authozization based on correct tokens
 * @param {object} req 
 * @param {object} res  
 */
const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"]|| req.headers.token;
    if (!bearerHeader) {
      res.send("Token is empty");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verifyToken(token, (error, data) => {
      if (error) {
        return res.send(error);
      }
      req.body.UserId = data.id;
      next(data.Id);
    });
  };

  /**
   * @description verify resetLink
   * @param {object} req 
   * @param {object} res 
   */
  const verifyResetLink = (req,res,next)=>{
    let reset = req.params.resetId;
    jwt.verifyToken(reset, (error, data) => {
      if (error) {
        return res.send(error);
      }
      req.body.email = data.email; 
      next();
    });
  };

/**
 * Validation of request
 * @param {object} req 
 * @param {object} res 
 */
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
module.exports = {validate,ensureToken,verifyResetLink};
