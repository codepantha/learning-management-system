const CustomError = require('../errors/CustomError');
const Admin = require('../models/Staff/Admin');

const isAdmin = async (req, res, next) => {
  const userId = req.userAuth._id;

  const user = await Admin.findById(userId);

  if (user.role !== 'admin') {
    const err = new CustomError(
      'Access denied. Admins only!',
      403
    );
    return next(err);
  }

  next();
};

module.exports = isAdmin;
