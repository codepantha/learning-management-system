const mongoose = require('mongoose');

const { Schema: { Types } } = mongoose;

const AcademicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    fromYear: {
      type: Date,
      required: true
    },
    toYear: {
      type: Date,
      required: true
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    students: [
      {
        type: Types.ObjectId,
        ref: 'Student'
      }
    ],
    teachers: [
      {
        type: Types.ObjectId,
        ref: 'Teacher'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('AcademicYear', AcademicYearSchema);
