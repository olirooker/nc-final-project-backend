exports.up = function (knex) {
  return knex.schema.createTable('contacts', (contactsTable) => {
    contactsTable.increments('contact_id').primary();
    contactsTable.text('first_name').notNullable();
    contactsTable.text('last_name').notNullable();
    contactsTable.text('phone_number').notNullable();
    contactsTable.text('relationship_user').notNullable();
    contactsTable.integer('house_number').notNullable();
    contactsTable.text('street_name').notNullable();
    contactsTable.text('postcode').notNullable();
    contactsTable.text('city').notNullable();
    contactsTable
      .text('uid')
      .references('users.uid')

      .onDelete('CASCADE');
    // contactsTable
    //   .integer('user_id')
    //   .references('users.user_id')
    //   .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('contacts');
};
