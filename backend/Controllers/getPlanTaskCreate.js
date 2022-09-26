var User = require("../Models/userAccounts");

function getPlanTaskCreate(request, res) {
  var Plan_app_Acronym = request.body.Task_app_Acronym;

  User.getPlanTaskCreate(Plan_app_Acronym, dataHold => {
    return res.send(dataHold);
  });
}

module.exports = { getPlanTaskCreate };
