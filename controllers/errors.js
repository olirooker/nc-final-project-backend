const send404 = (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
};

const send405 = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method" });
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handlePSQLErrors = (error, req, res, next) => {
  const badReqCodes = [
    "22P02",
    "42703",
    "23502",
    "23503",
    "2201W",
    "42501",
    "42622",
    "22P05",
    "22P03",
    "22P04",
    "23505",
    "23514",
  ];
  if (badReqCodes.includes(error.code)) {
    console.log(error, "psql error");
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(error);
  }
};

const handleInternalErrors = (error, req, res, next) => {
  console.log(error, "Internal error");
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = {
  handleInternalErrors,
  handlePSQLErrors,
  send405,
  send404,
  handleCustomErrors,
};
