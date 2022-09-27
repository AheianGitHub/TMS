//==================================Declarations=====================================================
// NPM modules
const mysql = require("mysql");

// Custom modules
const databaseConfiguration = require("./databaseConfiguration");
const bcryptController = require("../Controllers/bcryptController");

// Creating db connection
const db = mysql.createConnection(databaseConfiguration);

//=====================================Login==========================================================

//==============================Retrieve 1 User's Info================================================

const getOneUser = (username, callback) => {
  // Query
  let query = mysql.format("select * from useraccounts where username = ?", [
    username
  ]);

  // Querying
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result.length > 0) {
        let user = result[0];
        callback(null, user);
      } else {
        callback(null, false);
      }
    }
  });
};
//================================Verify User is User==================================================
const verifyUser = async (username, password, callback) => {
  // Find username
  getOneUser(username, (error, user) => {
    if (user) {
      // Get db hashed password
      let hashed_password = user.password;

      let bcrypt_res = bcryptController.compare_passwords(
        password,
        hashed_password
      );

      if (bcrypt_res === true && user.status) {
        console.log("Login successful");
        callback(null, user);
      } else if (bcrypt_res === true && !user.status) {
        callback(22, false);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, false);
    }
  });
};
//==================================Check User's Group=================================================
const checkGroup = (username, groupname, callback) => {
  getOneUser(username, (err, user) => {
    let user_groupname = user.groupname;
    let user_exists = user_groupname.includes(groupname);
    callback(null, user_exists);
  });
};
//=======================================================================================================

//=====================================View Profile=====================================================
//==================================Edit User's Profile=================================================
// Insert user
async function editProfile(username, password, email, callback) {
  // String and variables if required
  var set_fields = [];
  var set_vars = [];

  if (password) {
    set_fields.push("password = ?");
    let hashed_password = await bcryptController.hash_password(password);
    set_vars.push(hashed_password);
  }
  if (email) {
    set_fields.push("email = ?");
    set_vars.push(email);
  }

  set_vars.push(username);

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let query = mysql.format(
    "UPDATE useraccounts SET " + set_fields.toString() + " WHERE username = ?",
    set_vars
  );

  // Query from the database
  db.query(query, err => {
    // Error handling
    if (err) {
      console.log("Error encountered when trying to update user.");
      return callback(err, false);
    }
    console.log("Successfully updated user.");
    return callback(null, true);
  });
}
//=======================================================================================================
//=======================================Group Management================================================

//=======================================Group Display================================================

const getGroups = (request, response) => {
  //request -> input, res -> output
  db.query("select * from usergroups", (err, results) => {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        response.send({ result: results });
      } else {
        response.send({ message: null });
      }
    }
  });
};

//=======================================Group Creation================================================

const createGroup = (groupname, callback) => {
  var Query = `INSERT INTO usergroups (groupname) VALUES ('${groupname}')`;

  // SQL Query to usergroups Table for groupname
  db.query(Query, error => {
    if (error) {
      callback(error);
    }
    // else if (error === undefined) {
    //   callback(undefined);}
    else {
      callback(null);
    }
  });
};
//=======================================================================================================
//=======================================User Management=================================================

//===================================Get All & Toggle Status=============================================
const getAllUsers = callback => {
  // Query
  let query = mysql.format(
    "select username, email, groupname, status from useraccounts"
  );

  // Querying
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result) {
        callback(null, result);
      } else if (!result) {
        callback(null, false);
      }
    }
  });
};

const toggleStatus = (request, response) => {
  //request -> input, res -> output
  db.query(
    "UPDATE useraccounts set status = ? WHERE username = ?",
    [request.body.status, request.body.username],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================Create User================================================

const createUser = (request, callback) => {
  var Query = `INSERT INTO useraccounts (username, password, email, groupname) VALUES ('${request.body.username}', '${request.body.password}', '${request.body.email}', '${request.body.groupname}')`;

  // SQL Query to usergroups Table for groupname
  db.query(Query, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
};

//=======================================Edit Single User================================================

async function editUser(username, password, email, groupname, callback) {
  // String and variables if required
  var set_fields = [];
  var set_vars = [];

  if (password) {
    set_fields.push("password = ?");
    let hashed_password = await bcryptController.hash_password(password);
    set_vars.push(hashed_password);
  }
  if (email) {
    set_fields.push("email = ?");
    set_vars.push(email);
  }
  if (email === "") {
    set_fields.push("email = ?");
    set_vars.push(null);
  }
  if (groupname) {
    set_fields.push("groupname = ?");
    set_vars.push(groupname);
  }
  if (groupname === "") {
    set_fields.push("groupname = ?");
    set_vars.push(null);
  }

  set_vars.push(username);

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let query = mysql.format(
    "UPDATE useraccounts SET " + set_fields.toString() + " WHERE username = ?",
    set_vars
  );

  db.query(query, err => {
    // Error handling
    if (err) {
      console.log("Error encountered when trying to edit user.");
      return callback(err, false);
    }
    console.log("Successfully edited user.");
    return callback(null, true);
  });
}

//===================================Get All Applications=============================================
const getAllApplications = callback => {
  // Query
  let query = mysql.format(
    "select App_Acronym, App_Description, App_Rnumber, App_startDate, App_endDate, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, App_permit_Create from application"
  );

  // Querying
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result) {
        callback(null, result);
      } else if (!result) {
        callback(null, false);
      }
    }
  });
};

//=======================================Create Application================================================

const createApplication = (
  App_Acronym,
  App_Description,
  App_Rnumber,
  App_startDate,
  App_endDate,
  App_permit_Open,
  App_permit_toDoList,
  App_permit_Doing,
  App_permit_Done,
  App_permit_Create,
  callback
) => {
  var set_fields = [];
  var set_vars = [];

  if (App_Acronym) {
    set_fields.push("?");
    set_vars.push(App_Acronym);
  }
  if (App_Description) {
    set_fields.push("?");
    set_vars.push(App_Description);
  }
  if (!App_Description) {
    set_fields.push("?");
    set_vars.push(App_Description);
  }
  if (App_Rnumber) {
    set_fields.push("?");
    set_vars.push(App_Rnumber);
  }
  if (App_startDate) {
    set_fields.push("?");
    set_vars.push(App_startDate);
  }
  if (App_endDate) {
    set_fields.push("?");
    set_vars.push(App_endDate);
  }
  if (App_permit_Create) {
    set_fields.push("?");
    set_vars.push(App_permit_Create);
  }
  if (App_permit_Open) {
    set_fields.push("?");
    set_vars.push(App_permit_Open);
  }
  if (App_permit_toDoList) {
    set_fields.push("?");
    set_vars.push(App_permit_toDoList);
  }
  if (App_permit_Doing) {
    set_fields.push("?");
    set_vars.push(App_permit_Doing);
  }
  if (App_permit_Done) {
    set_fields.push("?");
    set_vars.push(App_permit_Done);
  }

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let Query = mysql.format(
    "INSERT INTO application VALUES (" + set_fields.toString() + ")",
    set_vars
  );

  // SQL Query to usergroups Table for groupname
  db.query(Query, error => {
    if (error) {
      console.log("Error encountered when trying to create application.");
      return callback(error, false);
    }
    console.log("Successfully created application!");
    return callback(null, true);
  });
};

//=======================================Edit Application================================================

async function editApplication(
  App_Acronym,
  App_Description,
  App_startDate,
  App_endDate,
  App_permit_Create,
  App_permit_Open,
  App_permit_toDoList,
  App_permit_Doing,
  App_permit_Done,
  callback
) {
  // String and variables if required
  var set_fields = [];
  var set_vars = [];

  if (App_Description) {
    set_fields.push("App_Description = ?");
    set_vars.push(App_Description);
  }
  if (App_startDate) {
    set_fields.push("App_startDate = ?");
    set_vars.push(App_startDate);
  }
  if (App_endDate) {
    set_fields.push("App_endDate = ?");
    set_vars.push(App_endDate);
  }
  if (App_permit_Create) {
    set_fields.push("App_permit_Create = ?");
    set_vars.push(App_permit_Create);
  }
  if (App_permit_Open) {
    set_fields.push("App_permit_Open = ?");
    set_vars.push(App_permit_Open);
  }
  if (App_permit_toDoList) {
    set_fields.push("App_permit_toDoList = ?");
    set_vars.push(App_permit_toDoList);
  }
  if (App_permit_Doing) {
    set_fields.push("App_permit_Doing = ?");
    set_vars.push(App_permit_Doing);
  }
  if (App_permit_Done) {
    set_fields.push("App_permit_Done = ?");
    set_vars.push(App_permit_Done);
  }

  set_vars.push(App_Acronym);

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let query = mysql.format(
    "UPDATE application SET " +
      set_fields.toString() +
      " WHERE App_Acronym = ?",
    set_vars
  );

  db.query(query, err => {
    // Error handling
    if (err) {
      console.log("Error encountered when trying to edit application.");
      return callback(err, false);
    }
    console.log("Successfully edited application!");
    return callback(null, true);
  });
}

//===================================Get All Plans=============================================
const getAllPlans = callback => {
  // Query
  let query = mysql.format(
    "select Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym, Plan_Colour from plan"
  );

  // Querying
  db.query(query, (error, result) => {
    if (error) {
      throw error;
    } else {
      if (result) {
        callback(null, result);
      } else if (!result) {
        callback(null, false);
      }
    }
  });
};

//==============================================Create Plan======================================================

const createPlan = (request, callback) => {
  var Query = `INSERT INTO plan (Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym, Plan_Colour) VALUES ('${request.body.Plan_MVP_name}', '${request.body.Plan_startDate}', '${request.body.Plan_endDate}', '${request.body.Plan_app_Acronym}', '${request.body.Plan_Colour}')`;

  // SQL Query to usergroups Table for groupname
  db.query(Query, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null);
    }
  });
};

//=======================================Edit Plan================================================

async function editPlan(
  Plan_MVP_name,
  Plan_startDate,
  Plan_endDate,
  Plan_app_Acronym,
  Plan_Colour,
  callback
) {
  // String and variables if required
  var set_fields = [];
  var set_vars = [];

  if (Plan_startDate) {
    set_fields.push("Plan_startDate = ?");
    set_vars.push(Plan_startDate);
  }
  if (Plan_endDate) {
    set_fields.push("Plan_endDate = ?");
    set_vars.push(Plan_endDate);
  }
  if (Plan_app_Acronym) {
    set_fields.push("Plan_app_Acronym = ?");
    set_vars.push(Plan_app_Acronym);
  }
  if (Plan_Colour) {
    set_fields.push("Plan_Colour = ?");
    set_vars.push(Plan_Colour);
  }
  set_vars.push(Plan_MVP_name);

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let query = mysql.format(
    "UPDATE plan SET " + set_fields.toString() + " WHERE Plan_MVP_name = ?",
    set_vars
  );

  db.query(query, err => {
    // Error handling
    if (err) {
      console.log("Error encountered when trying to edit plan.");
      return callback(err, false);
    }
    console.log("Successfully edited plan!");
    return callback(null, true);
  });
}

//=======================================Plan Multiselect (Task Create)================================================

const getPlanTaskCreate = (Plan_app_Acronym, callback) => {
  //request -> input, res -> output
  db.query(
    `select Plan_MVP_name from plan where Plan_app_Acronym = "${Plan_app_Acronym}"`,
    (err, results) => {
      if (err) {
        throw err;
      } else {
        if (results.length > 0) {
          callback({ result: results });
        } else {
          callback({ message: null });
        }
      }
    }
  );
};

//=======================================Get Plan Colour================================================

const getPlanColour = (Plan_MVP_name, callback) => {
  let query = mysql.format(
    `select Plan_Colour from plan where Plan_MVP_name = '${Plan_MVP_name}'`
    // Plan_MVP_name
  );
  //request -> input, res -> output

  db.query(query, (err, results) => {
    // Error handling
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        callback({ result: results });
      } else {
        callback({ message: null });
      }
    }
  });
};

//==============================================Create Task======================================================

const createTask = (
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
  callback
) => {
  var set_fields = [];
  var set_vars = [];

  if (Task_name) {
    set_fields.push("?");
    set_vars.push(Task_name);
  }
  if (Task_description) {
    set_fields.push("?");
    set_vars.push(Task_description);
  }
  if (!Task_description) {
    set_fields.push("?");
    set_vars.push(Task_description);
  }
  if (Task_notes) {
    set_fields.push("?");
    set_vars.push(Task_notes);
  }
  if (Task_id) {
    set_fields.push("?");
    set_vars.push(Task_id);
  }
  if (Task_plan) {
    set_fields.push("?");
    set_vars.push(Task_plan);
  }
  if (!Task_plan) {
    set_fields.push("?");
    set_vars.push(Task_plan);
  }
  if (Task_app_Acronym) {
    set_fields.push("?");
    set_vars.push(Task_app_Acronym);
  }
  if (Task_state) {
    set_fields.push("?");
    set_vars.push(Task_state);
  }
  if (Task_creator) {
    set_fields.push("?");
    set_vars.push(Task_creator);
  }
  if (Task_owner) {
    set_fields.push("?");
    set_vars.push(Task_owner);
  }
  if (Task_createDate) {
    set_fields.push("?");
    set_vars.push(Task_createDate);
  }

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let Query = mysql.format(
    "INSERT INTO task VALUES (" + set_fields.toString() + ")",
    set_vars
  );

  // SQL Query to usergroups Table for groupname
  db.query(Query, error => {
    if (error) {
      console.log("Error encountered when trying to create task.");
      return callback(error, false);
    }
    console.log("Successfully created task!");
    return callback(null, true);
  });
};

//=======================================Get Tasks================================================

const getTasks = (Task_app_Acronym, callback) => {
  //request -> input, res -> output
  db.query(
    `select Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner, Task_createDate from task where Task_app_Acronym = "${Task_app_Acronym}"`,
    (err, results) => {
      if (err) {
        throw err;
      } else {
        if (results.length > 0) {
          callback({ result: results });
        } else {
          callback({ message: null });
        }
      }
    }
  );
};

//=======================================Edit Task================================================

async function editTask(
  Task_name,
  Task_description,
  Task_notes,
  Task_plan,
  Task_owner,
  callback
) {
  // String and variables if required
  var set_fields = [];
  var set_vars = [];

  if (!Task_description) {
    set_fields.push("Task_description = ?");
    set_vars.push(Task_description);
  }
  if (Task_description) {
    set_fields.push("Task_description = ?");
    set_vars.push(Task_description);
  }
  if (Task_notes) {
    set_fields.push("Task_notes = ?");
    set_vars.push(Task_notes);
  }
  if (!Task_plan) {
    set_fields.push("Task_plan = ?");
    set_vars.push(Task_plan);
  }
  if (Task_plan) {
    set_fields.push("Task_plan = ?");
    set_vars.push(Task_plan);
  }
  if (Task_owner) {
    set_fields.push("Task_owner = ?");
    set_vars.push(Task_owner);
  }

  set_vars.push(Task_name);

  // Return if there is nothing to update in the user table
  if (set_fields.length === 0) {
    return callback(null);
  }

  let query = mysql.format(
    "UPDATE task SET " + set_fields.toString() + " WHERE Task_name = ?",
    set_vars
  );

  db.query(query, err => {
    // Error handling
    if (err) {
      console.log("Error encountered when trying to edit task.");
      return callback(err, false);
    }
    console.log("Successfully edited task!");
    return callback(null, true);
  });
}

//=======================================StateOpen_ToDoList================================================
const stateOpen_ToDoList = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_state = "To-Do-List" WHERE Task_name = ?`,
    [request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================StateToDoList_Doing================================================
const stateToDoList_Doing = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_state = "Doing" WHERE Task_name = ?`,
    [request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================StateDoing_ToDoList================================================
const stateDoing_ToDoList = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_state = "To-Do-List" WHERE Task_name = ?`,
    [request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================StateDoing_Done================================================
const stateDoing_Done = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_state = "Done" WHERE Task_name = ?`,
    [request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================StateDone_Doing================================================
const stateDone_Doing = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_state = "Doing" WHERE Task_name = ?`,
    [request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================StateDone_Closed================================================
const stateDone_Closed = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_state = "Closed" WHERE Task_name = ?`,
    [request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

//=======================================StateOpen_ToDoList================================================
const stateAuditTrail = (request, response) => {
  //request -> input, res -> output
  db.query(
    `UPDATE task set Task_notes = ? WHERE Task_name = ?`,
    [request.body.Task_notes, request.body.Task_name],
    (err, results) => {
      if (err) {
        throw err;
      } else {
        response.send({ result: true });
      }
    }
  );
};

module.exports = {
  getOneUser,
  verifyUser,
  checkGroup,
  editProfile,
  getGroups,
  createGroup,
  getAllUsers,
  toggleStatus,
  createUser,
  editUser,
  getAllApplications,
  createApplication,
  editApplication,
  getAllPlans,
  createPlan,
  editPlan,
  getPlanTaskCreate,
  getPlanColour,
  createTask,
  getTasks,
  editTask,
  stateOpen_ToDoList,
  stateToDoList_Doing,
  stateDoing_ToDoList,
  stateDoing_Done,
  stateDone_Doing,
  stateDone_Closed,
  stateAuditTrail
};
