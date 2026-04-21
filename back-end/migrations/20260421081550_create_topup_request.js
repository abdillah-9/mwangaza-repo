exports.up = function (knex) {
  return knex.schema.createTable("topup_requests", (table) => {
    table.increments("id").primary();

    table.integer("user_id").unsigned().notNullable();
    table.decimal("amount", 14, 2).notNullable();

    table.string("currency", 10).defaultTo("TZS");
    table.string("payment_method").notNullable(); // M-PESA, BANK, AGENT

    table.string("reference").nullable(); // external txn id
    table.string("proof_url").nullable();

    table
      .enu("status", ["PENDING", "APPROVED", "REJECTED"])
      .defaultTo("PENDING");

    table.text("rejection_reason").nullable();

    table.timestamps(true, true);

    table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("topup_requests");
};