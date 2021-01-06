const usersRouter = require("express").Router();
const {
  getAllUsers,
  getUserByUid,
  postNewUser,
  deleteUser,
} = require("../controllers/usersController");
usersRouter.route("/").get(getAllUsers).post(postNewUser);

usersRouter.route("/:uid").get(getUserByUid).patch().delete(deleteUser);

module.exports = usersRouter;
