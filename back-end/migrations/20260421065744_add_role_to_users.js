exports.up = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.enu('role', ['USER', 'ADMIN']).defaultTo('USER');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('role');
  });
};