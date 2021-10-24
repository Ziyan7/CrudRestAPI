require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.generateToken = (email,id) => {
  return jwt.sign(
    {
      email: email,
      id:id
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