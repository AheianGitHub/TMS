var User = require("../Models/userAccounts");

function getAllUsers(req, res) {
  User.getAllUsers((err, dataHold) => {
    return res.send(dataHold);
  });
}

module.exports = { getAllUsers };
