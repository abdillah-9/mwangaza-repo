const topupRepo = require("../repositories/topup.repository");
const knex = require("../config/db");

// CREATE REQUEST
const createTopup = async (payload) => {
  if (!payload.amount || payload.amount <= 0) {
    throw new Error("Invalid amount");
  }

  const [request] = await topupRepo.createRequest(payload);
  return request;
};

// APPROVE TOPUP
const approveTopup = async (id) => {
  const request = await topupRepo.getById(id);

  if (!request) throw new Error("Request not found");
  if (request.status !== "PENDING") throw new Error("Already processed");

  return knex.transaction(async (trx) => {
    // 1. update wallet
    const wallet = await trx("wallets")
      .where({ user_id: request.user_id })
      .first();

    const newBalance =
      parseFloat(wallet.balance) + parseFloat(request.amount);

    await trx("wallets")
      .where({ user_id: request.user_id })
      .update({ balance: newBalance });

    // 2. transaction log
    await trx("wallet_transactions").insert({
      user_id: request.user_id,
      type: "TOPUP",
      amount: request.amount,
      balance_after: newBalance,
      reference: request.reference,
    });

    // 3. update request
    await trx("topup_requests")
      .where({ id })
      .update({ status: "APPROVED" });

    return { message: "Topup approved", balance: newBalance };
  });
};

// REJECT TOPUP
const rejectTopup = async (id, reason) => {
  const request = await topupRepo.getById(id);

  if (!request) throw new Error("Request not found");
  if (request.status !== "PENDING") throw new Error("Already processed");

  await topupRepo.updateStatus(id, "REJECTED", {
    rejection_reason: reason,
  });

  return { message: "Topup rejected" };
};

const getPending = () => topupRepo.getPending();

module.exports = {
  createTopup,
  approveTopup,
  rejectTopup,
  getPending,
};