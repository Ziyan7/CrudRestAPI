require('dotenv').config();
var nodemailer = require('nodemailer');
let url = 'http://localhost:3000/reset/'
exports.mailer = (data, callback) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ziyannodejs@gmail.com',
          pass: '123nodejs123'
        }
      });
      
      var mailOptions = {
        from: process.env.sendersEmailId,
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
