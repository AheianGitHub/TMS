var User = require("../Models/userAccounts");

function getUserData(req, res) {
  let username = req.body.username;
  User.getOneUser(username, (err, dataHold) => {
    return res.send({
      username: dataHold.username,
      email: dataHold.email,
      groupname: dataHold.groupname,
      status: dataHold.status
    });
  });
}

module.exports = { getUserData };
