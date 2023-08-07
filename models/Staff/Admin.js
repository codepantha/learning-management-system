const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const adminSchema = new Schema(
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
    role: {
      type: String,
      default: 'admin'
    },
    academicTerms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AcademicTerm'
      }
    ],
    academicYears: [
      {
        type: Schema.Types.ObjectId,
        ref: 'AcademicYear'
      }
    ],
    classLevels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ClassLevel'
      }
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
      }
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program'
      }
    ]
  },
  { timestamps: true }
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.verifyPassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
