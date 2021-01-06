const { fetchAllUsers, fetchUserByUid } = require("../models/usersModels");

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getUserByUid = (req, res, next) => {
  fetchUserByUid(req)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getAllUsers, getUserByUid };
