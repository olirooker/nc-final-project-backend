const { usersData, contactsData } = require("../data/index.js");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("users").insert(usersData).returning("*");
    })
    .then((userRows) => {
      return knex("contacts").insert(contactsData).returning("*");
    });
};
