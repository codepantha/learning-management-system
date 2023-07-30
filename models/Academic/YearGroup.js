const mongoose = require('mongoose');
const { Schema: { Types } } = mongoose;

const YearGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    academicYear: {
      type: Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('YearGroup', YearGroupSchema);
