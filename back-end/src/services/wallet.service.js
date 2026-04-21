const walletRepo = require('../repositories/wallet.repository');

exports.getWalletById = async (trx, id) => {
  return await walletRepo.findById(trx, id);
};