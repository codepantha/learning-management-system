const CustomError = require('../../errors/CustomError');
const Teacher = require('../../models/Staff/Teacher');
const generateToken = require('../../utils/generateToken');

//@desc Register teacher
//@route POST /api/v1/teachers/register
//@access Private

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const teacherExists = await Teacher.findOne({ name });

  if (teacherExists)
    throw new CustomError('A teacher exists with that name.', 409);

  const data = await Teacher.create({ name, email, password });

  res.status(201).json({
    status: 'success',
    message: 'Teacher created successfully',
    data
  });
};

//@desc Login teacher
//@route POST /api/v1/teachers/login
//@access Public

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // check if email exists
  const teacher = await Teacher.findOne({ email });

  if (teacher && (await teacher.verifyPassword(password))) {
    const token = generateToken(teacher._id);

    return res.status(200).json({
      status: 'success',
      message: 'Teacher login successful.',
      data: token
    });
  }

  throw new CustomError('Invalid credentials.', 401);
};

//@desc Get all teachers
//@route POST /api/v1/admin/teachers/
//@access Public

exports.index = async (req, res) => {
  const data = await Teacher.find();

  res.status(200).json({
    status: 'success',
    message: 'Teachers fetched successfully.',
    data: data
  });
}
