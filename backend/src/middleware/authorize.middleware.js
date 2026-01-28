const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toUpperCase();

    const normalizedAllowedRoles = allowedRoles.map(
      role => role.toUpperCase()
    );

    if (!normalizedAllowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden: Access denied"
      });
    }

    next();
  };
};

module.exports = authorize;
