const logger  = require("../../logger/logger");

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
module.exports = validate;
