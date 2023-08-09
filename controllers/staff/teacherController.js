const CustomError = require('../../errors/CustomError');
const Teacher = require('../../models/Staff/Teacher');

//@desc Register admin
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
  })
};
