var User = require("../Models/userAccounts");

function getAllApplications(req, res) {
  User.getAllApplications((err, dataHold) => {
    return res.send(dataHold);
  });
}

module.exports = { getAllApplications };
