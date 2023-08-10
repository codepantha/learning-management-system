const CustomError = require('../errors/CustomError');
const Teacher = require('../models/Staff/Teacher');

const isTeacher = async (req, res, next) => {
  const id = req.userAuth._id;
  const teacher = await Teacher.findById(id);

  if (teacher.role !== 'teacher') {
    const err = new CustomError('Access denied. Teachers only!', 403);
    return next(err);
  }

  next();
};

module.exports = isTeacher;
