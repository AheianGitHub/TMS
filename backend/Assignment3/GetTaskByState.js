var User = require("../Models/userAccounts");

exports.GetTaskByState = async (request, response) => {
  var username = request.body.username;
  var password = request.body.password;
  var Task_app_Acronym = request.body.Task_app_Acronym;
  var Task_state = request.body.Task_state;

  //if mandatory fields are empty
  if (
    !username.trim() ||
    !password.trim() ||
    !Task_app_Acronym.trim() ||
    !Task_state.trim()
  ) {
    return response.status(411).send({ code: 411 });
  }

  //if task state values are not any of the 5 state values
  if (
    Task_state.trim() != "open" &&
    Task_state.trim() != "todolist" &&
    Task_state.trim() != "doing" &&
    Task_state.trim() != "done" &&
    Task_state.trim() != "close"
  ) {
    return response.status(406).send({ code: 406 });
  }

  User.verifyUser(username, password, (err, userResult) => {
    //Authentication fail
    if (!userResult) {
      //User Disabled
      if (err === 22) {
        return response.status(403).send({ code: 403 });
      }
      //Wrong username/password
      return response.status(401).send({ code: 401 });
    }
    //Authentication passed
    User.getAllApplication(Task_app_Acronym, (err, appResult) => {
      //App doesn't exist
      if (!appResult || appResult.length === 0) {
        return response.status(404).send({ code: 404 });
      }

      User.getTaskByState(Task_app_Acronym, Task_state, (err, taskResult) => {
        console.log(taskResult);
        return response.status(200).send({
          code: 200,
          "Query Results": taskResult
        });
      });
    });
  });
};
