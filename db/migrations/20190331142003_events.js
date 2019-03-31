exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments('_id');
    table.string('title');
    table.integer('number_of_guests');
    table.string('location');
    table.float('price');
    table.string('date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
