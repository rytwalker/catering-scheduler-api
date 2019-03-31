exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments('_id');
    table.string('title').notNullable();
    table.integer('number_of_guests').notNullable();
    table.string('location').notNullable();
    table.float('price').notNullable();
    table.string('date').notNullable();
    table.string('start_time').notNullable();
    table.string('end_time').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
