const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repo = require('../repositories/auth.repository');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

function accessToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );
}

function refreshToken(user) {
  return jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

exports.register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await repo.createUser({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password_hash: hashedPassword,
    role: 'USER'
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await repo.findByEmail(email);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw new Error('Invalid credentials');
  }

  const access = accessToken(user);
  const refresh = refreshToken(user);

  await repo.storeRefreshToken({
    user_id: user.id,
    token: refresh,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    revoked: false
  });

  return { accessToken: access, refreshToken: refresh };
};

exports.refresh = async (token) => {
  const stored = await repo.findRefreshToken(token);

  if (!stored) {
    throw new Error('Invalid refresh token');
  }

  const decoded = jwt.verify(token, REFRESH_SECRET);

  // only id is trusted from refresh token
  const newAccess = accessToken({
    id: decoded.id,
    role: 'USER' // optional fallback; better fetch from DB later
  });

  return { accessToken: newAccess };
};

exports.logout = async (token) => {
  return await repo.revokeToken(token);
};