//==================================Declarations=====================================================
var express = require("express");
var loginControl = require("../Controllers/loginControl");
var CheckGroup = require("../Controllers/checkGroup");
var getUserData = require("../Controllers/getUserData");

const editProfile = require("../Controllers/editProfile");

const createGroup = require("../Controllers/createGroup");

const getAllUsers = require("../Controllers/getAllUsers");
const userAccounts = require("../Models/userAccounts");
const createUser = require("../Controllers/createUser");
const editUser = require("../Controllers/editUser");

const getAllApplications = require("../Controllers/getAllApplications");
const createApplication = require("../Controllers/createApplication");
const editApplication = require("../Controllers/editApplication");

const getAllPlans = require("../Controllers/getAllPlans");
const createPlan = require("../Controllers/createPlan");
const editPlan = require("../Controllers/editPlan");

const getPlanTaskCreate = require("../Controllers/getPlanTaskCreate");
const getPlanColour = require("../Controllers/getPlanColour");
const createTask = require("../Controllers/createTask");
const getTasks = require("../Controllers/getTasks");
const editTask = require("../Controllers/editTask");

const sendMail = require("../Controllers/sendMail");

const CreateTask = require("../Assignment3/CreateTask");
const GetTaskByState = require("../Assignment3/GetTaskByState");
const PromoteTask2Done = require("../Assignment3/PromoteTask2Done");

// Activate router
var routers = express.Router();
//===================================================================================================
routers.use((req, res, next) => {
  res.locals.currentUser = req.user;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    return response.status(400).send({ code: 400 });
  }
  next();
});

routers.post("/Login", loginControl.authenticateUser);
routers.post("/Logout", loginControl.logoutUser);
routers.post("/CheckGroup", CheckGroup.CheckGroup);
routers.post("/GetUserData", getUserData.getUserData);

routers.post("/EditProfile", editProfile.editProfile);

routers.post("/GetGroups", userAccounts.getGroups);
routers.post("/CreateGroup", createGroup.createGroup);

routers.post("/GetAllUsers", getAllUsers.getAllUsers);
routers.post("/ToggleStatus", userAccounts.toggleStatus);
routers.post("/CreateUser", createUser.createUser);
routers.post("/EditUser", editUser.editUser);

routers.post("/GetAllApplications", getAllApplications.getAllApplications);
routers.post("/CreateApplication", createApplication.createApplication);
routers.post("/EditApplication", editApplication.editApplication);

routers.post("/GetAllPlans", getAllPlans.getAllPlans);
routers.post("/CreatePlan", createPlan.createPlan);
routers.post("/EditPlan", editPlan.editPlan);

routers.post("/GetPlanTaskCreate", getPlanTaskCreate.getPlanTaskCreate);
routers.post("/GetPlanColour", getPlanColour.getPlanColour);
routers.post("/CreateTask", createTask.createTask);
routers.post("/GetTasks", getTasks.getTasks);
routers.post("/EditTask", editTask.editTask);

routers.post("/StateOpen_ToDoList", userAccounts.stateOpen_ToDoList);
routers.post("/StateToDoList_Doing", userAccounts.stateToDoList_Doing);
routers.post("/StateDoing_ToDoList", userAccounts.stateDoing_ToDoList);
routers.post("/StateDoing_Done", userAccounts.stateDoing_Done);
routers.post("/StateDone_Doing", userAccounts.stateDone_Doing);
routers.post("/StateDone_Closed", userAccounts.stateDone_Closed);
routers.post("/StateAuditTrail", userAccounts.stateAuditTrail);

routers.post("/SendMail", sendMail);

routers.post("/api/CreateTask", CreateTask.CreateTask);
routers.post("/api/GetTaskByState", GetTaskByState.GetTaskByState);
routers.post("/api/PromoteTask2Done", PromoteTask2Done.PromoteTask2Done);

routers.post("/api/*", (request, response) => {
  response.status(400).send({ code: 400 });
});

module.exports = routers;
