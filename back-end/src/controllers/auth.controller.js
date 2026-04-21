const service = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const tokens = await service.login(req.body);
    res.json(tokens);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = await service.refresh(req.body.refreshToken);
    res.json(token);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await service.logout(req.body.refreshToken);
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};