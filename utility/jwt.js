require('dotenv').config();
const jwt = require("jsonwebtoken");
const mail = require("./nodemailer")

exports.generateToken = (email) => {
  mail.mailer();
  return jwt.sign(
    {
      email: email,
    },
    process.env.secretKey,
    { expiresIn: "1h" }
  );
};

exports.verifyToken = (token,callback) => {
  return jwt.verify(token,process.env.secretKey,(error,data)=>{
   return error ? callback(error, null) : callback(null, data);
  });
};