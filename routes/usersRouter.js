const usersRouter = require("express").Router();
const { getAllUsers, getUserByUid } = require("../controllers/usersController");
usersRouter.route("/").get(getAllUsers).post(postNewUser);

usersRouter.route("/:uid").get(getUserByUid);

module.exports = usersRouter;
