var User = require("../Models/userAccounts");

function editUser(request, res) {
  var username = request.body.username;
  var password = request.body.password;
  var email = request.body.email;
  var groupname = request.body.groupname;

  User.editUser(username, password, email, groupname, (err, dataHold) => {
    if (err) {
      return res.status(400).send(err);
    } else if (dataHold) {
      return res.sendStatus(200);
    } else if (!dataHold) {
      return res.sendStatus(400);
    }
  });
}

module.exports = { editUser };
