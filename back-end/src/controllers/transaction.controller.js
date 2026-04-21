const transactionService = require('../services/transaction.service');

exports.transfer = async (req, res) => {
  try {
    const result = await transactionService.transfer(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.topup = async (req, res) => {
  try {
    const result = await transactionService.topup(req.body, req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const result = await transactionService.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const result = await transactionService.getById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};