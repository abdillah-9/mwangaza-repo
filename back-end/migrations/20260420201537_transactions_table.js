exports.up = function(knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();

    table.enu('type', ['TOPUP', 'TRANSFER']).notNullable();

    table.decimal('amount', 14, 2).notNullable();

    table.integer('sender_wallet_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('wallets');

    table.integer('receiver_wallet_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('wallets');

    table.enu('status', ['SUCCESS', 'FAILED']).defaultTo('SUCCESS');

    table.text('description').nullable();

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};