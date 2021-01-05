exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments('user_id').primary();
    usersTable.text('first_name').notNullable();
    usersTable.text('last_name').notNullable();
    usersTable.text('username').notNullable();
    usersTable.text('phone_number').notNullable();
    usersTable.integer('house_number').notNullable();
    usersTable.text('street_name').notNullable();
    usersTable.text('postcode').notNullable();
    usersTable.text('city').notNullable();
    usersTable.text('uid').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
