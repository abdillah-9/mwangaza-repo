const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const walletRoutes = require('./routes/wallet.routes');
const transactionRoutes = require('./routes/transaction.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Mwanga Wallet API is running' });
});

const PORT = process.env.PORT || 4000;

app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api', userRoutes);
// app.use('/api', transactionRoutes);
// app.use('/api', walletRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});