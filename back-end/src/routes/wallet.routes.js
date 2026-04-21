const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/:id', auth, walletController.getWallet);

module.exports = router;