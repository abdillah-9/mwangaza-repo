const userRepo = require('../repositories/user.repository');

exports.createUser = async (data) => {
  // basic validation (keep simple for now)
  if (!data.email || !data.password) {
    throw new Error('Email and password required');
  }

  return await userRepo.createUser(data);
};

exports.getUserById = async (id) => {
  return await userRepo.getUserById(id);
};

exports.updateUser = async (id, data) => {
  return await userRepo.updateUser(id, data);
};

exports.deleteUser = async (id) => {
  return await userRepo.softDeleteUser(id);
};