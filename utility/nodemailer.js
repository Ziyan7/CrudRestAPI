require('dotenv').config();
var nodemailer = require('nodemailer');
exports.mailer = () =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.sendersEmailId,
          pass: process.env.password
        }
      });
      
      var mailOptions = {
        from: process.env.sendersEmailId,
        to: process.env.receiversEmailId,
        subject: 'Sending Email using Node.js',
        text: 'You have logged in!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
