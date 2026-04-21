exports.create = async (trx, data) => {
  const [transaction] = await trx('transactions')
    .insert(data)
    .returning('*');

  return transaction;
};

exports.getAll = async () => {
  return await knex('transactions');
};

exports.getById = async (id) => {
  return await knex('transactions').where({ id }).first();
};