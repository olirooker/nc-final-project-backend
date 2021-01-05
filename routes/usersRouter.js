const usersRouter = require("express").Router();
const { getAllUsers } = require("../controllers/usersController");
usersRouter.route("/").get(getAllUsers);

module.exports = usersRouter;
