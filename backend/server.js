//==================================Declarations=====================================================
// NPM modules
var bodyParser = require("body-parser");
var express = require("express");
var mysql = require("mysql");
var passport = require("passport");
var session = require("express-session");

var routers = require("./Routes/routers");
const databaseConnection = require("./Models/databaseConfiguration");
var passportConfiguration = require("./Controllers/passportConfiguration");

var server = express();

var database = mysql.createConnection(databaseConnection);

//===================================================================================================

database.connect(error => {
  if (error) {
    console.error("Error connecting to database.. " + error.stack);
    return;
  }
  console.log("Database connected! " + database.threadId);
});

server.use(bodyParser.json());

// PASSPORT SETUP
// Initialise passport config and session
passportConfiguration();
server.use(
  session({
    secret: "SecretiveKey@123",
    resave: false,
    saveUninitialized: false
  })
);
// Initialise passport and session
server.use(passport.initialize());
server.use(passport.session());

server.use(routers);

// Initialise port
server.set("port", process.env.PORT || 8080);
server.listen(server.get("port"), () => {
  console.log("Server started on port " + server.get("port"));
});
