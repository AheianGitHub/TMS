var User = require("../Models/userAccounts");
var sendMail = require("../Controllers/sendMail");

exports.PromoteTask2Done = async (request, response) => {
  var username = request.body.username;
  var password = request.body.password;
  var Task_name = request.body.Task_name;
  var Task_app_Acronym = request.body.Task_app_Acronym;

  //if mandatory fields are empty
  if (
    !username.trim() ||
    !password.trim() ||
    !Task_name.trim() ||
    !Task_app_Acronym.trim()
  ) {
    return response.status(411).send({ code: 411 });
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
    User.getTask(Task_app_Acronym, Task_name, (err, taskResult) => {
      //Retrieve task details to check if task exists and to check if task is in the right state

      if (!taskResult) {
        return response.status(404).send({ code: 404 });
      }

      if (taskResult[0].Task_state != "Doing") {
        return response.status(406).send({ code: 406 });
      }

      User.PromoteTask2Done(Task_name, (err, promoteResult) => {
        if (promoteResult) {
          if (
            sendMail({ body: { username: username, Task_name: Task_name } })
          ) {
            return response.status(200).send({ code: 200 });
          } else {
            return response.status(400).send({ code: 400 });
          }
        }
      });
    });
  });
};
