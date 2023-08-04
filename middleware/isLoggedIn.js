const CustomError = require('../errors/CustomError');
const Admin = require('../models/Staff/Admin');
const verifyToken = require('../utils/verifyToken');

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    const err = new CustomError('Token expired or invalid', 401);
    return next(err);
  }

  const user = await Admin.findById(verifiedToken.id).select('name email role')
  if (user) req.userAuth = user

  next();
};

module.exports = isLoggedIn;
