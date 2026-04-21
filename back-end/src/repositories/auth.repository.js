const knex = require('../config/db');

exports.createUser = async (user) => {
  return await knex.transaction(async (trx) => {

    // 1. create user
    const [created] = await trx('users')
      .insert(user)
      .returning('*');

    // 2. create wallet automatically
    await trx('wallets').insert({
      user_id: created.id,
      balance: 0
    });

    return created;
  });
};

exports.findByEmail = async (email) => {
  return await knex('users')
    .where({ email })
    .first();
};

exports.storeRefreshToken = async (data) => {
  return await knex('refresh_tokens')
    .insert(data);
};

exports.findRefreshToken = async (token) => {
  return await knex('refresh_tokens')
    .where({ token, revoked: false })
    .first();
};

exports.revokeToken = async (token) => {
  return await knex('refresh_tokens')
    .where({ token })
    .update({ revoked: true });
};