const CustomError = require('../../errors/CustomError');
const Admin = require('../../models/Staff/Admin');
const Teacher = require('../../models/Staff/Teacher');
const generateToken = require('../../utils/generateToken');
const { hash_password } = require('../../utils/helpers');
const verifyToken = require('../../utils/verifyToken');
const bcrypt = require('bcryptjs');

//@desc Register admin
//@route POST /api/v1/admins/register
//@access Private

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  // check if admin exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    error = new Error('Admin Exists!');
    error.statusCode = 400;
    throw error;
  }

  const user = await Admin.create({ name, email, password });

  res.status(201).json({
    status: 'success',
    data: user,
    message: 'Admin registration successful.'
  });
};

//@desc Login admin
//@route POST /api/v1/admins/login
//@access Private

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    const token = generateToken(user._id);

    return res.status(200).json({
      status: 'success',
      data: token,
      message: 'Admin login successful.'
    });
  }

  return res.json({ message: 'Invalid login credentials' });
};

//@desc Get all admins
//@route GET /api/v1/admins
//@access Private

exports.index = async (req, res) => {
  const admins = await Admin.find();

  res.status(200).json({
    status: 'success',
    message: 'Admins fetched successfully',
    data: admins
  });
};

//@desc Get admin profile
//@route GET /api/v1/admins/:id
//@access Private

exports.profile = async (req, res) => {
  const admin = await Admin.findById(req.userAuth.id)
    .select('-password -createdAt -updatedAt')
    .populate('academicYears');

  if (!admin) throw new CustomError('Admin not found', 404);
  res.status(200).json({
    status: 'success',
    data: admin,
    message: 'Admin profile fetched successfully.'
  });
};

//@desc Update single admin
//@route PUT /api/v1/admins/:id
//@access Private

exports.update = async (req, res) => {
  const { email, name, password } = req.body;

  const emailExists = await Admin.findOne({ email });

  if (emailExists) throw new CustomError('Email already in use', 409);

  let admin;

  if (password) {
    const encPassword = await hash_password(password);

    admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      { email, name, password: encPassword },
      { new: true, runValidators: true }
    );
  } else {
    admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      { email, name },
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    status: 'success',
    data: admin,
    message: 'Admin updated successfully.'
  });
};

//@desc Delete single admin
//@route DELETE /api/v1/admins/:id
//@access Private

exports.destroy = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Deleted admin'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

//@desc Suspend a teacher
//@route PUT /api/v1/admins/suspend/teacher/:id
//@access Private

exports.suspendTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Suspended teacher'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

//@desc Unsuspend a teacher
//@route PUT /api/v1/admins/unsuspend/teacher/:id
//@access Private

exports.unsuspendTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher suspension lifted'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

//@desc Withdraw a teacher
//@route PUT /api/v1/admins/withdraw/teacher/:id
//@access Private

exports.withdrawTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'Withdrawn teacher'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

//@desc unWithdraw a teacher
//@route PUT /api/v1/admins/unwithdraw/teacher/:id
//@access Private

exports.unWithdrawTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'teacher withdrawal reversed'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

//@desc publish exam result
//@route PUT /api/v1/admins/publish/exam/:id
//@access Private

exports.publishExamResult = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'exam results published'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

//@desc unpublish exam result
//@route PUT /api/v1/admins/unpublish/exam/:id
//@access Private

exports.unPublishExamResult = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: 'exam results unpublished'
    });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message
    });
  }
};

exports.updateTeacher = async (req, res) => {
  const { teacherId } = req.params;
  const { name, email, subject, program, classLevel, academicYear } = req.body;

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) throw new CustomError('Teacher not found.', 404);

  if (email) {
    const emailExists = await Teacher.findOne({ email });
    if (emailExists) throw new CustomError('Email exists', 409);
    teacher.email = email;
  }

  if (name) teacher.name = name;
  if (subject) teacher.subject = subject;
  if (program) teacher.program = program;
  if (classLevel) teacher.classLevel = classLevel;
  if (academicYear) teacher.academicYear = academicYear;

  await teacher.save();

  res.status(200).json({
    status: 'success',
    message: 'Teacher updated successfully.',
    data: teacher
  });
};
