var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'starbucksApp.team2021@gmail.com',
    pass: 'starbucks2021',
  },
});

var mailOptions = {
  from: 'starbucksApp.team2021@gmail.com',
  to: 'starbucksApp.team2021@gmail.com',
  subject: 'Test Sb',
  text: 'Success!',
};

/**
 *Sends the emial based on optionss
 *@param {string} options - the information of the sender and reciever
 */
var send_email = (options) => {
  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  transporter,
  mailOptions,
  send_email,
};
