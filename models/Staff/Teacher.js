const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

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
          Math.floor(100 + Math.random() * 900) +
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
      type: Schema.Types.ObjectId,
      ref: 'Subject'
    },
    applicationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program'
    },
    // A teacher can teach more than one class level
    classLevel: {
      type: Schema.Types.ObjectId,
      ref: 'ClassLevel'
    },
    academicYear: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicYear'
    },
    examsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exam'
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
    academicTerm: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicTerm'
    }
  },
  { timestamps: true }
);

TeacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Teacher', TeacherSchema);
