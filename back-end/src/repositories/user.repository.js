const knex = require('../config/db'); // your knex instance

exports.createUser = async (data) => {
  const [user] = await knex('users')
    .insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password_hash: data.password, // (we'll hash later)
      role: 'USER'
    })
    .returning('*');

  return user;
};

exports.getUserById = async (id) => {
  return await knex('users')
    .where({ id })
    .first();
};

exports.updateUser = async (id, data) => {
  const [user] = await knex('users')
    .where({ id })
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      updated_at: knex.fn.now()
    })
    .returning('*');

  return user;
};

exports.softDeleteUser = async (id) => {
  const [user] = await knex('users')
    .where({ id })
    .update({
      is_active: false,
      deleted_at: knex.fn.now()
    })
    .returning('*');

  return user;
};