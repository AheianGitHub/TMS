var User = require("../Models/userAccounts");

function getTasks(request, res) {
  var Task_app_Acronym = request.body.Task_app_Acronym;

  User.getTasks(Task_app_Acronym, dataHold => {
    return res.send(dataHold);
  });
}

module.exports = { getTasks };
