var User = require("../Models/userAccounts");

exports.CreateTask = async (request, response) => {
  //if key does not exist. *"key" refers to the LHS of the postman body, RHS is called "values"
  let keyHolder = Object.keys(request.body);
  if (
    !keyHolder.includes("username") ||
    !keyHolder.includes("password") ||
    !keyHolder.includes("Task_name") ||
    !keyHolder.includes("Task_app_Acronym") ||
    !keyHolder.includes("Task_description") ||
    !keyHolder.includes("Task_plan")
  ) {
    return response.status(400).send({ code: 400 });
  }

  var username = request.body.username;
  var password = request.body.password;
  var Task_name = request.body.Task_name;
  var Task_app_Acronym = request.body.Task_app_Acronym;
  var Task_description = request.body.Task_description;
  var Task_plan = request.body.Task_plan;

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
    //Authentication passed
    User.getAllApplication(Task_app_Acronym, (err, appResult) => {
      //App doesn't exist
      if (!appResult || appResult.length === 0) {
        return response.status(404).send({ code: 404 });
      }

      //duplicated task name
      User.getTask(Task_name, (err, taskResult) => {
        if (taskResult) {
          return response.status(400).send({ code: 400 });
        }

        User.getTasks(Task_app_Acronym, taskResult => {
          var taskCountHolder;

          if (taskResult === undefined) {
            taskCountHolder = 0;
          } else {
            taskCountHolder = taskResult.result.length;
          }

          let Task_id =
            Task_app_Acronym +
            "_" +
            (
              parseInt(appResult[0].App_Rnumber) +
              taskCountHolder +
              1
            ).toString();
          let Task_state = "Open";
          let Task_creator = username;
          let Task_owner = Task_creator;
          let Task_createDate = new Date()
            .toLocaleDateString("pt-br")
            .split("/")
            .reverse()
            .join("-");

          let Task_notes =
            Task_creator +
            " created task: " +
            Task_name +
            " (Owner: " +
            Task_owner +
            ", Current state: " +
            Task_state +
            ", Created Date: " +
            Task_createDate +
            ").";

          if (Task_plan.trim().length > 0) {
            User.getPlan(Task_plan, (err, planResult) => {
              //if plan doesn't exist
              if (!planResult || planResult.length === 0) {
                return response.status(404).send({ code: 404 });
              }

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
                  return response
                    .status(201)
                    .send({ code: 201, Task_id: Task_id });
                }
              );
            });
          }

          if (Task_plan.trim().length === 0) {
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
                return response
                  .status(201)
                  .send({ code: 201, Task_id: Task_id });
              }
            );
          }
        });
      });
    });
  });
};
