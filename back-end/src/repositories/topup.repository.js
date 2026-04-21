const knex = require("../config/db");

const createRequest = (data) => {
  return knex("topup_requests").insert(data).returning("*");
};

const getById = (id) => {
  return knex("topup_requests").where({ id }).first();
};

const getPending = () => {
  return knex("topup_requests").where({ status: "PENDING" });
};

const updateStatus = (id, status, extra = {}) => {
  return knex("topup_requests")
    .where({ id })
    .update({ status, ...extra, updated_at: knex.fn.now() });
};

module.exports = {
  createRequest,
  getById,
  getPending,
  updateStatus,
};