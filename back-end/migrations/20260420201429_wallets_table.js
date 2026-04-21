exports.up = function(knex) {
  return knex.schema.createTable('wallets', table => {
    table.increments('id').primary();

    table.integer('user_id')
      .unsigned()
      .notNullable()
      .unique()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.decimal('balance', 14, 2).defaultTo(0);

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('wallets');
};