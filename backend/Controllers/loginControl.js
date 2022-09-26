var passport = require("passport");
var User = require("../Models/userAccounts");

const authenticateUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    // Error handling
    if (err) {
      next(err);
    }
    // Authenticated, send username as token
    if (user) {
      req.logIn(user, err => {
        // Error handling
        if (err) {
          next(err);
        }
        let username = user.username;

        User.checkGroup(username, "admin", (err, check_res) => {
          let admin_status = check_res;
          let token_data = {
            username: username,
            admin: admin_status
          };
          res.send({ token: token_data });
        });
      });
    }
    if (!user) {
      if (err === 22) {
        return res.status(400).send({ message: "Disabled" });
      } else {
        return res.status(400).send({ message: "Incorrect" });
      }
    }
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  console.log("Logging out from backend..");
  req.logout(err => {
    if (err) {
      return next(err);
    }
  });
};

module.exports = { authenticateUser, logoutUser };
