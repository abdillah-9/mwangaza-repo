exports.seed = async function(knex) {
  await knex('users').where({ email: 'admin@test.com' }).del();

  await knex('users').insert([
    {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@test.com',
      password_hash: 'hashedpassword',
      role: 'ADMIN'
    }
  ]);
};