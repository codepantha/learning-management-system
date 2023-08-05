const CustomError = require("../../errors/CustomError");
const AcademicYear = require("../../models/Academic/AcademicYear");

exports.create = async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  const exists = await AcademicYear.findOne({ name });

  if (exists) throw new CustomError('Duplicate academic year.', 409);

  const data = await AcademicYear.create({ name, fromYear, toYear, createdBy: req.userAuth._id });

  res.status(201).json({
    status: 'success',
    message: 'Academic year created successfully',
    data
  });
};
