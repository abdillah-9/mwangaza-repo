const express = require('express');
const router = express.Router();

const controller = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const v = require('../validations/transaction.validation');

router.post(
  '/transfer',
  auth,
  validate(v.transferValidation),
  controller.transfer
);

router.post(
  '/topup',
  auth,
  validate(v.topupValidation),
  controller.topup
);

router.get('/', auth, controller.getTransactions);
router.get('/:id', auth, controller.getTransactionById);