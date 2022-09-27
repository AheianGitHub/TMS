var User = require("../Models/userAccounts");

function editTask(request, res) {
  var Task_name = request.body.Task_name;
  var Task_description = request.body.Task_description;
  var Task_notes = request.body.Task_notes;
  var Task_plan = request.body.Task_plan;
  var Task_owner = request.body.Task_owner;

  User.editTask(
    Task_name,
    Task_description,
    Task_notes,
    Task_plan,
    Task_owner,
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

module.exports = { editTask };
