const nodemailer = require('nodemailer');

module.exports =  function() {
  console.log("in mailmodule");
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oskar.kindeland@gmail.com',
      pass: '//'
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <oskar.kindeland@gmail.com>', // sender address
    to: 'bar@blurdybloop.com, wobbler160@hotmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};
