const { table } = require('../db/connection');

exports.up = function (knex) {
  return knex.schema.createTable('contacts', (contactsTable) => {
    contactsTable.text('phone_number').notNullable();
    table.dropColumn('phone_number');
  });
};

exports.down = function (knex) {
  knex.schema.table('contacts', function (table) {
    table.dropColumn('email');
  });
};
