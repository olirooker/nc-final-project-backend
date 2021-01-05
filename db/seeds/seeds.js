const { usersData, contactsData } = require('../data/index.js');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('users').insert(usersData).returning('*');
    })
    .then((userRows) => {
      console.log(userRows, 'users');
      return knex('contacts').insert(contactsData).returning('*');
    })
    .then((contactRows) => {
      console.log(contactRows, 'contacts');
    });
};
