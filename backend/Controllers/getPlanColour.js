var User = require("../Models/userAccounts");

function getPlanColour(request, res) {
  // console.log(request.body);
  var Plan_MVP_name = request.body.Plan_MVP_name;

  User.getPlanColour(Plan_MVP_name, dataHold => {
    return res.send(dataHold);
  });
}

module.exports = { getPlanColour };
