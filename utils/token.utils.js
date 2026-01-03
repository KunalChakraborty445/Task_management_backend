export const generateToken = (user, message, statusCode, res) => {
  const token = typeof user?.generateJsonWebToken === 'function'
    ? user.generateJsonWebToken()
    : null;

  const cookieName = 'userToken';

  const cookieOptions = {
    expires: new Date(
      Date.now() + ((Number(process.env.JWT_EXPIRE) || 7) * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  const safeUser = user && typeof user.toObject === 'function' ? user.toObject() : { ...user };
  if (safeUser) {
    delete safeUser.password;
    delete safeUser.resetPasswordToken;
    delete safeUser.resetPasswordExpire;
    delete safeUser.__v;
  }

  if (!token) {
    return res.status(500).json({ success: false, message: 'Failed to generate token' });
  }

  res
    .status(statusCode)
    .cookie(cookieName, token, cookieOptions)
    .json({
      success: true,
      message,
      user: safeUser,
      token,
    });
};

