exports.up = function (knex) {
  return knex.schema.createTable("wallet_transactions", (table) => {
    table.increments("id").primary();

    table.integer("user_id").unsigned().notNullable();
    table.enu("type", ["TOPUP", "WITHDRAW", "PAYMENT"]).notNullable();

    table.decimal("amount", 14, 2).notNullable();
    table.decimal("balance_after", 14, 2).notNullable();

    table.string("reference").nullable();

    table.timestamps(true, true);

    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("wallet_transactions");
};