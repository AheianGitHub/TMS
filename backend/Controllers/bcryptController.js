// Initialisation
const bcrypt = require("bcrypt");

function hash_password(password) {
  const saltRounds = 10;
  let hashed = bcrypt.hash(password, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    return hash;
  });
  return hashed;
}

// Compare passwords
function compare_passwords(password, hashed_password) {
  return bcrypt.compareSync(password, hashed_password);
}

module.exports = {
  hash_password,
  compare_passwords
};
