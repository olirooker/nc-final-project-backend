const handlePSQLErrors = (error, req, res, next) => {
  const badReqCodes = ["42703"];
  if (badReqCodes.includes(error.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(error);
  }
};

const handleInternalErrors = (error, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const send405 = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
};

const send404 = (req, res, next) => {
  res.status(404).send({ msg: "Route not found" });
};

module.exports = {
  handleInternalErrors,
  handlePSQLErrors,
  send405,
  send404,
  handleCustomErrors,
};
