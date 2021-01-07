const apiRouter = require("express").Router();
const { send405 } = require("../controllers/errors");
const { getAllEndpoints } = require("../controllers/apiController");
const usersRouter = require("./usersRouter");

apiRouter.route("/").get(getAllEndpoints).all(send405);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
