var User = require("../Models/userAccounts");

function getAllPlans(req, res) {
  User.getAllPlans((err, dataHold) => {
    return res.send(dataHold);
  });
}

module.exports = { getAllPlans };
