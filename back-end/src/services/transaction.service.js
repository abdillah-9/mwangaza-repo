const knex = require('../config/db');
const walletRepo = require('../repositories/wallet.repository');
const transactionRepo = require('../repositories/transaction.repository');

exports.transfer = async ({ senderWalletId, receiverWalletId, amount }) => {
  return await knex.transaction(async (trx) => {

    const senderWallet = await walletRepo.findById(trx, senderWalletId);
    const receiverWallet = await walletRepo.findById(trx, receiverWalletId);

    if (!senderWallet || !receiverWallet) {
      throw new Error('Wallet not found');
    }

    const senderBalance = Number(senderWallet.balance);

    if (senderBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // 💸 deduct sender
    await walletRepo.decrementBalance(trx, senderWalletId, amount);

    // 💰 add receiver
    await walletRepo.incrementBalance(trx, receiverWalletId, amount);

    // 🧾 record transaction
    const tx = await transactionRepo.create(trx, {
      sender_wallet_id: senderWalletId,
      receiver_wallet_id: receiverWalletId,
      amount,
      type: 'TRANSFER',
      status: 'SUCCESS'
    });

    return tx;
  });
};

exports.topup = async ({ receiverWalletId, amount }) => {
  return await knex.transaction(async (trx) => {

    const wallet = await walletRepo.findById(trx, receiverWalletId);

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (amount <= 0) {
      throw new Error('Invalid amount');
    }

    //add money
    await walletRepo.incrementBalance(trx, receiverWalletId, amount);

    //record transaction
    const tx = await transactionRepo.create(trx, {
      sender_wallet_id: null,
      receiver_wallet_id: receiverWalletId,
      amount,
      type: 'TOPUP',
      status: 'SUCCESS'
    });

    return tx;
  });
};

exports.getAll = async () => {
  return await transactionRepo.getAll();
};

exports.getById = async (id) => {
  return await transactionRepo.getById(id);
};