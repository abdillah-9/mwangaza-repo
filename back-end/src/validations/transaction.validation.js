exports.topupValidation = (data) => {
  if (!data.receiverWalletId) {
    return { error: 'receiverWalletId is required' };
  }

  if (!data.amount || data.amount <= 0) {
    return { error: 'amount must be greater than 0' };
  }

  return {};
};

exports.transferValidation = (data) => {
  if (!data.senderWalletId) {
    return { error: 'senderWalletId is required' };
  }

  if (!data.receiverWalletId) {
    return { error: 'receiverWalletId is required' };
  }

  if (!data.amount || data.amount <= 0) {
    return { error: 'amount must be greater than 0' };
  }

  return {};
};