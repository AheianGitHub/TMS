//==================================Declarations=====================================================
var express = require("express");

var routers = express.Router();
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

const createPlan = require("../Controllers/createPlan");
// const editPlan = require("../Controllers/editPlan");

//===================================================================================================
routers.use((req, res, next) => {
  res.locals.currentUser = req.user;
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

routers.post("/CreatePlan", createPlan.createPlan);
// routers.post("/EditPlan", editPlan.editPlan);

module.exports = routers;
