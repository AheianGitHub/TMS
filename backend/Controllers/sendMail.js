const nodemailer = require("nodemailer");
var User = require("../Models/userAccounts");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (request, response) => {
  let mailData = request.body;

  let username = mailData.username;
  let task_name = mailData.Task_name;

  let message =
    username +
    " has promoted " +
    task_name +
    " from Doing to Done. Awaiting your review.";

  // Generate test SMTP service account from ethereal.email
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8f80f08e6c5c1e",
      pass: "dca52a29cc08bd"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"TMS Generated Message" <tms@hotmail.com>', // sender address
    to: "chersiang96@live.com", // list of receivers
    subject: "Task: " + "'" + task_name + "'" + " done", // Subject line
    text: message // plain text body
  });

  if (info) {
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
};
