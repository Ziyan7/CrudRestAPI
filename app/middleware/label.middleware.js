/**
 * Purpose : Validates the requests  
 * @file : label.middleware.js
 * @author  : Abdul Ziyan
 */

 const Joi = require("joi");

 /** joi is used to validate three properties i.e.
  *name, age and mobileNumber
  */
 const validate = (req, res, next) => {
   const schema = Joi.object({
     label: Joi.string()
       .min(2)
       .required(),
   });
   const result = schema.validate(req.body);
   if (result.error) {
     return res.json({ message: result.error.message });
   }
   next();
 };
 
 module.exports = validate;