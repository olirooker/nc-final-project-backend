const {
  fetchAllUsers,
  fetchUserByUid,
  sendNewUser,
  removeUser,
} = require("../models/usersModels");

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

const postNewUser = (req, res, next) => {
  sendNewUser(req)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

const deleteUser = (req, res, next) => {
  removeUser(req)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

// const patchUser = (req, res, next) => {
//   updateUser(req)
//     .then((user) => {
//       res.status(201).send({ user });
//     })
//     .catch(next);
// };

module.exports = { getAllUsers, getUserByUid, postNewUser, deleteUser };
