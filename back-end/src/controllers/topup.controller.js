const topupService = require("../services/topup.service");

const createTopup = async (req, res) => {
  try {
    const data = await topupService.createTopup({
      user_id: req.user.id,
      amount: req.body.amount,
      payment_method: req.body.payment_method,
      reference: req.body.reference,
      proof_url: req.body.proof_url,
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const approveTopup = async (req, res) => {
  try {
    const result = await topupService.approveTopup(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const rejectTopup = async (req, res) => {
  try {
    const result = await topupService.rejectTopup(
      req.params.id,
      req.body.reason
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPending = async (req, res) => {
  const data = await topupService.getPending();
  res.json(data);
};

module.exports = {
  createTopup,
  approveTopup,
  rejectTopup,
  getPending,
};