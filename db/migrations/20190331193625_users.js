exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('_id');
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('phone_number').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
