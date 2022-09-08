var User = require("../Models/userAccounts");

function CheckGroup(username, groupname, callback) {
  //Set statusToken to true/false. Go to frontend to use token to check for admin status
  User.checkGroup(username, groupname, (err, check_res) => {
    callback(null, check_res);
  });
}
module.exports = { CheckGroup };
