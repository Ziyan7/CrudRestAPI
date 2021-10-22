require('dotenv').config();
var nodemailer = require('nodemailer');
exports.mailer = (data, callback) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.sendersEmailId,
          pass: process.env.password
        }
      });
      
      var mailOptions = {
        from: process.env.sendersEmailId,
        to: data.email,
        subject: 'Sending Email using Node.js',
        text: 'reset link = ' + data.resetlink
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
