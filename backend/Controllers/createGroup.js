var User = require("../Models/userAccounts");

function createGroup(request, res) {
  var groupname = request.body.groupname;

  User.createGroup(groupname, err => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).send({ duplicate: true });
      } else {
        return res.status(400).send({ duplicate: false });
      }
    } else if (!err) {
      return res.sendStatus(200);
    }
  });
}

module.exports = { createGroup };
