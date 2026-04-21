exports.up = function(knex) {
  return knex.schema.createTable('topup_requests', table => {
    table.increments('id').primary();

    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.decimal('amount', 14, 2).notNullable();

    table.enu('status', ['PENDING', 'APPROVED', 'REJECTED'])
      .defaultTo('PENDING');

    table.text('notes').nullable();

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('topup_requests');
};