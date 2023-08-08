const CustomError = require('../../errors/CustomError');
const AcademicTerm = require('../../models/Academic/AcademicTerm');
const Admin = require('../../models/Staff/Admin');

//@desc Get all Academic Terms
//@route GET /api/v1/academic-terms
//@access Private

exports.index = async (req, res) => {
  const data = await AcademicTerm.find();
  res.status(200).json({
    status: 'success',
    message: 'Academic terms fetched successfully.',
    data
  });
};

//@desc Get Single Academic Term
//@route POST /api/v1/academic-terms/:id
//@access Private
exports.show = async (req, res) => {
  const data = await AcademicTerm.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Academic term fetched successfully',
    data
  });
};

//@desc Create Academic Term
//@route POST /api/v1/academic-terms
//@access Private

exports.create = async (req, res) => {
  const { name, description, duration } = req.body;
  const adminId = req.userAuth._id;

  const exists = await AcademicTerm.findOne({ name });

  if (exists) throw new CustomError('Duplicate academic term.', 409);

  const data = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: adminId
  });

  // push academic term into academicTerms on admin
  const admin = await Admin.findById(adminId);
  admin.academicTerms.push(data._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    message: 'Academic term created successfully',
    data
  });
};

//@desc Update Academic Term
//@route PUT /api/v1/academic-terms/:id
//@access Private

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, duration } = req.body;

  const exists = await AcademicTerm.findOne({ name });

  if (exists) throw new CustomError('Academic term already exists', 409);

  const data = await AcademicTerm.findByIdAndUpdate(
    id,
    { name, description, duration, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Academic term updated successfully!',
    data
  });
};

//@desc Delete Academic Term
//@route DELETE /api/v1/academic-terms/:id
//@access Private

exports.destroy = async (req, res) => {
  const { id } = req.params;

  const data = await AcademicTerm.findByIdAndDelete(id);

  if (!data) throw new CustomError('Academic term does not exist', 404);

  res.status(200).json({
    status: 'success',
    message: `${data.name} deleted successfully`,
  })
}
