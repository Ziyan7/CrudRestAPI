/**
 * Purpose : Validates the requests  
 * @file : user.middleware.js
 * @author  : Abdul Ziyan
 */

const Joi = require("joi");

/** joi is used to validate three properties i.e.
 *name, age and mobileNumber
 */
const validate = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .regex(/^[A-Z][a-zA-Z]/)
      .message("First letter of the name must be in uppercase ")
      .required(),

    lastName: Joi.string()
      .min(3)
      .regex(/^[A-Z][a-zA-Z]/)
      .message("First letter of the name must be in uppercase ")
      .required(),

    email: Joi.string().email().required(),
    password: Joi.string(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.json({ message: result.error.message });
  }
  next();
};

module.exports = validate;
