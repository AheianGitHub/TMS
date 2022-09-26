var User = require("../Models/userAccounts");

//Create User - Controller
exports.createTask = async (request, response) => {
  var Task_name = request.body.Task_name;
  var Task_description = request.body.Task_description;
  var Task_notes = request.body.Task_notes;
  var Task_id = request.body.Task_id;
  var Task_plan = request.body.Task_plan;
  var Task_app_Acronym = request.body.Task_app_Acronym;
  var Task_state = request.body.Task_state;
  var Task_creator = request.body.Task_creator;
  var Task_owner = request.body.Task_owner;
  var Task_createDate = request.body.Task_createDate;
  var Task_colour = request.body.Task_colour;

  User.createTask(
    Task_name,
    Task_description,
    Task_notes,
    Task_id,
    Task_plan,
    Task_app_Acronym,
    Task_state,
    Task_creator,
    Task_owner,
    Task_createDate,
    err => {
      if (err) {
        if (err.errno === 1062) {
          return response.status(400).send({ duplicate: true });
        } else {
          return response.status(400).send({ duplicate: false });
        }
      } else if (!err) {
        return response.sendStatus(200);
      }
    }
  );
};
