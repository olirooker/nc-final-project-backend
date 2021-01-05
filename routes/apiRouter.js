const apiRouter = require("express").Router();
const usersRouter = require("./usersRouter");

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
