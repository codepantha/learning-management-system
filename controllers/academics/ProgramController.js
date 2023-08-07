const CustomError = require('../../errors/CustomError');
const Program = require('../../models/Academic/Program');
const Subject = require('../../models/Academic/Subject');
const Admin = require('../../models/Staff/Admin');

//@desc Get all Programs
//@route GET /api/v1/programs
//@access Private

exports.index = async (req, res) => {
  const data = await Program.find();
  res.status(200).json({
    status: 'success',
    message: 'Programs fetched successfully.',
    data
  });
};

//@desc Get Single Program
//@route POST /api/v1/programs/:id
//@access Private
exports.show = async (req, res) => {
  const data = await Program.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Program fetched successfully',
    data
  });
};

//@desc Create Program
//@route POST /api/v1/programs
//@access Private

exports.create = async (req, res) => {
  const { name, description, duration } = req.body;
  const adminId = req.userAuth._id;

  const exists = await Program.findOne({ name });

  if (exists) throw new CustomError('Duplicate program.', 409);

  const data = await Program.create({
    name,
    description,
    duration,
    createdBy: adminId
  });

  // push program into programs on admin
  const admin = await Admin.findById(adminId);
  admin.programs.push(data._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    message: 'Program created successfully',
    data
  });
};

//@desc Update Program
//@route PUT /api/v1/programs/:id
//@access Private

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, duration } = req.body;

  const exists = await Program.findOne({ name });

  if (exists) throw new CustomError('Program already exists', 409);

  const data = await Program.findByIdAndUpdate(
    id,
    { name, description, duration, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Program updated successfully!',
    data
  });
};

//@desc Delete Program
//@route DELETE /api/v1/programs/:id
//@access Private

exports.destroy = async (req, res) => {
  const { id } = req.params;

  const data = await Program.findByIdAndDelete(id);

  if (!data) throw new CustomError('Program does not exist', 404);

  const admin = await Admin.findById(req.userAuth._id);

  // remove the deleted id from the admin.programs []
  const programsExemptingDeletedProgram = admin.programs.filter(
    (program) => !program.equals(id)
  );

  admin.programs = programsExemptingDeletedProgram;
  await admin.save();

  res.status(200).json({
    status: 'success',
    message: `${data.name} deleted successfully`
  });
};

//@desc Get all Subjects for a program
//@route GET /api/v1/programs/:programId/subjects
//@access Private

exports.getProgramSubjects = async (req, res) => {
  const { programId } = req.params;

  const program = await Program.findById(programId);
  if (!program) throw new CustomError('Program does not exist', 404);

  const data = await Program.findById(programId).populate('subjects');
  return res.status(200).json({
    status: 'success',
    message: !data.subjects.length
      ? 'This program currently has no subjects.'
      : 'Subjects fetched successfully.',
    data: data.subjects
  });
};

//@desc Create Subject
//@route POST /api/v1/programs/:programId/subjects
//@access Private

exports.createProjectSubject = async (req, res) => {
  const { programId } = req.params;
  const { name, description, academicTerm, duration } = req.body;
  const adminId = req.userAuth._id;

  const program = await Program.findById(programId);

  if (!program) throw new CustomError('Program not found.', 404);

  const subjectExists = await Subject.findOne({ name });

  if (subjectExists) throw new CustomError('Duplicate subject.', 409);

  const data = await Subject.create({
    name,
    description,
    academicTerm,
    duration,
    createdBy: adminId
  });

  // push subject into programs
  program.subjects.push(data._id);
  await program.save();

  res.status(201).json({
    status: 'success',
    message: 'Subject created successfully',
    data
  });
};
