const express = require("express");
const cors = require("cors");
const app = express();
const {
  handleInternalErrors,
  handlePSQLErrors,
  send404,
  send405,
  handleCustomErrors,
} = require("./controllers/errors");
const apiRouter = require("./routes/apiRouter");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.route("/*").get(send404).all(send405);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalErrors);

module.exports = app;
