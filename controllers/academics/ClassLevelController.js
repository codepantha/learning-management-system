const CustomError = require('../../errors/CustomError');
const ClassLevel = require('../../models/Academic/ClassLevel');
const Admin = require('../../models/Staff/Admin');

//@desc Get all Class Level
//@route GET /api/v1/class-levels
//@access Private

exports.index = async (req, res) => {
  const data = await ClassLevel.find();
  res.status(200).json({
    status: 'success',
    message: 'Class levels fetched successfully.',
    data
  });
};

//@desc Get Single Class Level
//@route POST /api/v1/class-levels/:id
//@access Private
exports.show = async (req, res) => {
  const data = await ClassLevel.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Class Level fetched successfully',
    data
  });
};

//@desc Create Class Level
//@route POST /api/v1/class-levels
//@access Private

exports.create = async (req, res) => {
  const { name, description } = req.body;
  const adminId = req.userAuth._id;

  const exists = await ClassLevel.findOne({ name });

  if (exists) throw new CustomError('Duplicate class level.', 409);

  const data = await ClassLevel.create({
    name,
    description,
    createdBy: adminId
  });

  // push class level into classLevels on admin
  const admin = await Admin.findById(adminId);
  admin.classLevels.push(data._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    message: 'Class level created successfully',
    data
  });
};

//@desc Update Class Level
//@route PUT /api/v1/class-levels/:id
//@access Private

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const exists = await ClassLevel.findOne({ name });

  if (exists) throw new CustomError('Class level already exists', 409);

  const data = await ClassLevel.findByIdAndUpdate(
    id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Class level updated successfully!',
    data
  });
};

//@desc Delete Class Level
//@route DELETE /api/v1/class-levels/:id
//@access Private

exports.destroy = async (req, res) => {
  const { id } = req.params;

  const data = await ClassLevel.findByIdAndDelete(id);

  const admin = await Admin.findById(req.userAuth._id);

  // remove the deleted id from the admin.classLevels []
  const classLevelsExemptingDeletedClass = admin.classLevels.filter(
    (classLevel) => !classLevel.equals(id)
  );

  admin.classLevels = classLevelsExemptingDeletedClass;
  await admin.save();

  if (!data) throw new CustomError('Class level does not exist', 404);

  res.status(200).json({
    status: 'success',
    message: `${data.name} deleted successfully`
  });
};
