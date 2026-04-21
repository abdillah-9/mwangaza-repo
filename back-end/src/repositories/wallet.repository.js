const knex = require('../config/db');

exports.findById = async (trx, id) => {
  return await trx('wallets')
    .where({ id })
    .first();
};

exports.incrementBalance = async (trx, id, amount) => {
  return await trx('wallets')
    .where({ id })
    .increment('balance', amount);
};

exports.decrementBalance = async (trx, id, amount) => {
  return await trx('wallets')
    .where({ id })
    .decrement('balance', amount);
};