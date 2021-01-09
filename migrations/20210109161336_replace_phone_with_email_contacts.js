const { table } = require('../db/connection');

exports.up = function (knex) {
  knex.schema.table('contacts', function (table) {
    table.integer('email').notNull();
    table.dropColumn('phone_number');
  });
};

exports.down = function (knex) {
  knex.schema.table('contacts', function (table) {
    table.dropColumn('email');
  });
};
