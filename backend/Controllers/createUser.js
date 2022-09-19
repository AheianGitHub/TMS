var bcrypt = require("./bcryptController");
var User = require("../Models/userAccounts");

//Create User - Controller
exports.createUser = async (request, response) => {
  const myPlaintextPassword = request.body.password;

  request.body.password = await bcrypt.hash_password(myPlaintextPassword);

  User.createUser(request, err => {
    if (err) {
      if (err.errno === 1062) {
        return response.status(400).send({ duplicate: true });
      } else {
        return response.status(400).send({ duplicate: false });
      }
    } else if (!err) {
      return response.sendStatus(200);
    }
  });
};
