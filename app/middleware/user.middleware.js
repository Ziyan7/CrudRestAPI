const Joi = require("joi");

/** joi is used to validate three properties i.e. 
*name, age and mobileNumber
*/
const validate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .regex(/^[A-Z][a-zA-Z]/)
      .message("First letter of the name must be in uppercase ")
      .required(),

    age: Joi.number().min(1).max(100).required(),

    mobileNumber: Joi.string()
      .regex(/^[91]+[ ][0-9]{10}$/)
      .message("Enter a valid mobile number")
      .required(),

    email: Joi.string().email().required(),
    password : Joi.string()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.json({ message: result.error.message });
  }
  next();
};

module.exports = validate;
