require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.generateToken = (email,id) => {
  return jwt.sign(
    {
      email: email,
      id:id
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

exports.verifyToken = (token,callback) => {
  return jwt.verify(token,process.env.SECRET_KEY,(error,data)=>{
   return error ? callback(error, null) : callback(null, data);
  });
};