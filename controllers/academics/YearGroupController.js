const CustomError = require('../../errors/CustomError');
const YearGroup = require('../../models/Academic/YearGroup');
const Admin = require('../../models/Staff/Admin');

//@desc Get all Year Group
//@route GET /api/v1/year-groups
//@access Private

exports.index = async (req, res) => {
  const data = await YearGroup.find();
  res.status(200).json({
    status: 'success',
    message: 'Year groups fetched successfully.',
    data
  });
};

//@desc Get Single Year Group
//@route POST /api/v1/year-groups/:id
//@access Private

exports.show = async (req, res) => {
  const data = await YearGroup.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Year Group fetched successfully',
    data
  });
};

//@desc Create Year Group
//@route POST /api/v1/year-groups
//@access Private

exports.create = async (req, res) => {
  const { name, academicYear } = req.body;
  const adminId = req.userAuth._id;

  const exists = await YearGroup.findOne({ name });

  if (exists) throw new CustomError('Duplicate year group.', 409);

  const data = await YearGroup.create({
    name,
    academicYear,
    createdBy: adminId
  });

  // push year group into yearGroups on admin
  const admin = await Admin.findById(adminId);
  admin.yearGroups.push(data._id);
  await admin.save();

  res.status(201).json({
    status: 'success',
    message: 'Year group created successfully',
    data
  });
};

//@desc Update Year group
//@route PUT /api/v1/year-groups/:id
//@access Private

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, academicYear } = req.body;

  const exists = await YearGroup.findOne({ name });

  if (exists) throw new CustomError('Year group already exists', 409);

  const data = await YearGroup.findByIdAndUpdate(
    id,
    { name, academicYear },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Year group updated successfully!',
    data
  });
};

//@desc Delete Year Group
//@route DELETE /api/v1/year-groups/:id
//@access Private

exports.destroy = async (req, res) => {
  const { id } = req.params;

  const data = await YearGroup.findByIdAndDelete(id);

  const admin = await Admin.findById(req.userAuth._id);

  // remove the deleted id from the admin.yearGroups []
  const yearGroupsExemptingDeletedyear = admin.yearGroups.filter(
    (yearGroup) => !yearGroup.equals(id)
  );

  admin.yearGroups = yearGroupsExemptingDeletedyear;
  await admin.save();

  if (!data) throw new CustomError('Year group does not exist', 404);

  res.status(200).json({
    status: 'success',
    message: `${data.name} deleted successfully`
  });
};
