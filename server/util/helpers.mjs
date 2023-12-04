export const parseError = err => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
  };
export const sessionizeUser = user => {
  return { userId: user.id, username: user.username, role: user.role };
};

export const checkUserRole = (requiredRole) => (req, res, next) => {
  if (req.user && req.user.role === requiredRole) {
      return next();
  } else {
      return res.status(403).json({ error: 'Permission denied' });
  }
};