const CustomError = require('../errors/CustomError');
const Student = require('../models/Academic/Student');
const Admin = require('../models/Staff/Admin');
const Teacher = require('../models/Staff/Teacher');
const verifyToken = require('../utils/verifyToken');

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    const err = new CustomError('Token expired or invalid', 401);
    return next(err);
  }

  let user = await Admin.findById(verifiedToken.id).select('name email role');
  if (!user) {
    user = await Teacher.findById(verifiedToken.id).select('name email role');
    if (!user)
      user = await Student.findById(verifiedToken.id).select('name email role');
  }

  req.userAuth = user;

  next();
};

module.exports = isLoggedIn;
