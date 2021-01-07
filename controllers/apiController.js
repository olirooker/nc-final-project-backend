const { fetchAllEndpoints } = require("../models/apiModel");

const getAllEndpoints = (req, res, next) => {
  const endpoints = fetchAllEndpoints();
  res.status(200).send(endpoints);
};

module.exports = { getAllEndpoints };
