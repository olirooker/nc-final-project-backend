const connection = require("../db/connection");
const fetchAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then((users) => {
      return users;
    });
};

const fetchUserByUid = (req) => {
  const uid = req.params.uid;
  return connection
    .select("*")
    .from("users")
    .where("uid", "=", uid)
    .then((user) => {
      return user[0];
    });
};

const addNewUser = (req) => {
  const newUser = req.body;
  return connection
    .insert(newUser)
    .into("users")
    .returning("*")
    .then((user) => {
      return user[0];
    });
};

module.exports = { fetchAllUsers, fetchUserByUid, addNewUser };
