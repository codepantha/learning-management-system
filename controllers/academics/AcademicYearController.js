const CustomError = require('../../errors/CustomError');
const AcademicYear = require('../../models/Academic/AcademicYear');

//@desc Get all Academic Years
//@route GET /api/v1/academic-years
//@access Private

exports.index = async (req, res) => {
  const data = await AcademicYear.find();
  res.status(200).json({
    status: 'success',
    message: 'Academic years fetched',
    data
  });
};

//@desc Get Single Academic Year
//@route POST /api/v1/academic-years/:id
//@access Private
exports.show = async (req, res) => {
  const data = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Academic year fetched successfully',
    data
  });
};

//@desc Create Academic Year
//@route POST /api/v1/academic-years
//@access Private

exports.create = async (req, res) => {
  const { name, fromYear, toYear } = req.body;

  const exists = await AcademicYear.findOne({ name });

  if (exists) throw new CustomError('Duplicate academic year.', 409);

  const data = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id
  });

  res.status(201).json({
    status: 'success',
    message: 'Academic year created successfully',
    data
  });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, fromYear, toYear } = req.body;

  const exists = await AcademicYear.findOne({ name });

  if (exists) throw new CustomError('Academic year already exists', 409);

  const data = await AcademicYear.findByIdAndUpdate(
    id,
    { name, fromYear, toYear, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Academic year updated successfully!',
    data
  });
};
