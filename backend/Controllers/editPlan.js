var User = require("../Models/userAccounts");

function editPlan(request, res) {
  var Plan_MVP_name = request.body.Plan_MVP_name;
  var Plan_startDate = request.body.Plan_startDate;
  var Plan_endDate = request.body.Plan_endDate;
  var Plan_app_Acronym = request.body.Plan_app_Acronym;
  var Plan_Colour = request.body.Plan_Colour;

  User.editPlan(
    Plan_MVP_name,
    Plan_startDate,
    Plan_endDate,
    Plan_app_Acronym,
    Plan_Colour,
    (err, dataHold) => {
      if (err) {
        return res.status(400).send(err);
      } else if (dataHold) {
        return res.sendStatus(200);
      } else if (!dataHold) {
        return res.sendStatus(400);
      }
    }
  );
}

module.exports = { editPlan };
