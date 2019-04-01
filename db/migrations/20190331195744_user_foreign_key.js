exports.up = function(knex, Promise) {
  return knex.schema.table('events', table => {
    // user_id
    table
      .integer('user_id')
      .unsigned()
      .references('_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', table => {
    table.dropColumn('user_id');
  });
};
