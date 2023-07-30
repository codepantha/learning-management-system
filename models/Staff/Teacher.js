const mongoose = require('mongoose');

const {
  Schema: { Types }
} = mongoose;

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    dateEmployed: {
      type: Date,
      default: Date.now
    },
    teacherId: {
      type: String,
      required: true,
      default: function () {
        return (
          'TEA' +
          math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(' ')
            .map((name) => name[0])
            .join('')
            .toUpperCase()
        );
      }
    },
    // if withdrawn, teacher may not log in
    isWithdrawn: {
      type: Boolean,
      default: false
    },
    // if suspended, teacher may log in but may not perform any task
    isSuspended: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'teacher'
    },
    subject: {
      type: Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    applicationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    program: {
      type: Types.ObjectId,
      ref: 'Program',
      required: true
    },
    // A teacher can teach more than one class level
    classLevel: {
      type: Types.ObjectId,
      ref: 'ClassLevel',
      required: true
    },
    academicYear: {
      type: Types.ObjectId,
      ref: 'AcademicYear',
      required: true
    },
    examsCreated: [
      {
        type: Types.ObjectId,
        ref: 'Exam'
      }
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    academicTerm: {
      type: Types.ObjectId,
      ref: 'AcademicTerm',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', TeacherSchema);
