const CustomError = require('../../errors/CustomError');
const Program = require('../../models/Academic/Program');
const Subject = require('../../models/Academic/Subject');
const Admin = require('../../models/Staff/Admin');

//@desc Get all Subjects
//@route GET /api/v1/subjects
//@access Private

exports.index = async (req, res) => {
  const data = await Subject.find();
  res.status(200).json({
    status: 'success',
    message: 'Subjects fetched successfully.',
    data
  });
};

//@desc Get Single Subject
//@route GET /api/v1/subjects/:id
//@access Private
exports.show = async (req, res) => {
  const data = await Subject.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Subject fetched successfully',
    data
  });
};

//@desc Update Subject
//@route PUT /api/v1/subjects/:id
//@access Private

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, academicTerm, duration  } = req.body;

  const exists = await Program.findOne({ name });

  if (exists) throw new CustomError('Program already exists', 409);

  const data = await Subject.findByIdAndUpdate(
    id,
    { name, description, academicTerm, duration },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Subject updated successfully!',
    data
  });
};

//@desc Delete Subject
//@route DELETE /api/v1/subjects/:id
//@access Private

exports.destroy = async (req, res) => {
  const { id } = req.params;

  const data = await Subject.findByIdAndDelete(id);

  if (!data) throw new CustomError('Subject does not exist', 404);

  const programs = await Program.find({ subjects: id });
  const program = programs[0];

  // remove the deleted id from the program.subjects []
  const subjectsExemptingDeletedSubjects = program.subjects.filter(
    (subject) => !subject.equals(id)
  );

  program.subjects = subjectsExemptingDeletedSubjects;
  await program.save();

  res.status(200).json({
    status: 'success',
    message: `${data.name} deleted successfully`
  });
};
