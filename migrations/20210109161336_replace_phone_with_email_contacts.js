const { table } = require('../db/connection');

exports.up = function (knex) {
  return knex.schema.table('contacts', function (table) {
    table.text('email').notNull();
    table.dropColumn('phone_number');
  });
};

exports.down = function (knex) {
  return knex.schema.table('contacts', function (table) {
    table.dropColumn('email');
  });
};
