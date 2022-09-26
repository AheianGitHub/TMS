var User = require("../Models/userAccounts");

function CheckGroup(req, res) {
  let username = req.body.username;
  let groupname = req.body.groupname;
  //Set statusToken to true/false. Go to frontend to use token to check for admin status
  User.checkGroup(username, groupname, (err, check_res) => {
    return res.send(check_res);
  });
}
module.exports = { CheckGroup };
