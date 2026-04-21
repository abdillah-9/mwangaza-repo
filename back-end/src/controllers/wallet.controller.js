const walletService = require('../services/wallet.service');
const knex = require('../config/db');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await knex.transaction(async (trx) => {
      return await walletService.getWalletById(trx, req.params.id);
    });

    res.json(wallet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};