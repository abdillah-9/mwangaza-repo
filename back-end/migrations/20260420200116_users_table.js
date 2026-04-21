exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();

    table.string('first_name').notNullable();
    table.string('last_name').notNullable();

    table.string('email').unique().notNullable();
    table.string('phone').unique().nullable();

    table.string('password_hash').notNullable();

    table.enu('role', ['USER', 'ADMIN']).defaultTo('USER');

    table.boolean('is_active').defaultTo(true);

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};