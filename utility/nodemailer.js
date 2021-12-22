var nodemailer = require('nodemailer');
require('dotenv').config();
let url = 'http://localhost:3000/reset/' 
exports.mailer = (data, callback) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SENDERS_EMAILID,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.SENDERS_EMAILID,
        to: data.email,
        subject: 'Sending Email using Node.js',
        text: 'reset link = ' + url + data.resetlink
      };
      
      return transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return callback("Mail not sent" + error,null);
          
        } else {
          console.log('Email sent: ' + info.response);
          return callback(null,info);
          
        }
      });
}
