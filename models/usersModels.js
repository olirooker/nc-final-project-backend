const connection = require("../db/connection");
const fetchAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then((users) => {
      return users;
    });
};

module.exports = { fetchAllUsers };
