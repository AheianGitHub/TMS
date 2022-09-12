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
async function profileEdit(username, password, email, callback) {
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

async function userEdit(username, password, email, groupname, callback) {
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

module.exports = {
  getOneUser,
  verifyUser,
  checkGroup,
  profileEdit,
  getGroups,
  createGroup,
  getAllUsers,
  toggleStatus,
  createUser,
  userEdit,
  getAllApplications
};
