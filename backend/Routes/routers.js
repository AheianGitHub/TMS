//==================================Declarations=====================================================
var express = require("express");

var routers = express.Router();
var loginControl = require("../Controllers/loginControl");
var CheckGroup = require("../Controllers/checkGroup");

var getUserData = require("../Controllers/getUserData");
const profileEdit = require("../Controllers/profileEdit");

const createGroup = require("../Controllers/createGroup");

const getAllUsers = require("../Controllers/getAllUsers");
const userAccounts = require("../Models/userAccounts");
const CreateUser = require("../Controllers/createUser");
const userEdit = require("../Controllers/userEdit");

const getAllApplications = require("../Controllers/getAllApplications");
const createApplication = require("../Controllers/createApplication");

//===================================================================================================
routers.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

routers.post("/Login", loginControl.authenticateUser);
routers.post("/Logout", loginControl.logoutUser);
routers.post("/CheckGroup", CheckGroup.CheckGroup);
routers.post("/GetUserData", getUserData.getUserData);
routers.post("/ProfileEdit", profileEdit.profileEdit);
routers.post("/GetGroups", userAccounts.getGroups);
routers.post("/CreateGroup", createGroup.createGroup);
routers.post("/GetAllUsers", getAllUsers.getAllUsers);
routers.post("/ToggleStatus", userAccounts.toggleStatus);
routers.post("/CreateUser", CreateUser.CreateUser);
routers.post("/UserEdit", userEdit.userEdit);
routers.post("/getAllApplications", getAllApplications.getAllApplications);
routers.post("/CreateApplication", createApplication.createApplication);

module.exports = routers;
