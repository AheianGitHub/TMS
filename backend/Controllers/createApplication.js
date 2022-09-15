var User = require("../Models/userAccounts");

//Create User - Controller
exports.createApplication = async (request, response) => {
  User.createApplication(request, err => {
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
