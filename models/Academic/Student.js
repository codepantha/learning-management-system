const mongoose = require('mongoose');

const {Schema, Schema: { Types } } = mongoose;

const StudentSchema = new Schema(
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
    studentId: {
      type: String,
      required: true,
      default: function () {
        return (
          'STU' +
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
    isWithdrawn: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'student'
    },
    // classes are from level 1 to 6
    // keep track of the class level the student is at
    classLevels: [
      {
        type: Types.ObjectId,
        ref: 'ClassLevel',
        required: true
      }
    ],
    currentClassLevel: {
      type: String,
      default: function () {
        return this.classLevels.at(-1);
      }
    },
    academicYear: {
      type: Types.ObjectId,
      ref: 'AcademicYear',
      required: true
    },
    dateAdmitted: {
      type: Date,
      required: true
    },
    examResults: [
      {
        type: Types.ObjectId,
        ref: 'ExamResult'
      }
    ],
    program: {
      type: Types.ObjectId,
      ref: 'Program',
      required: true
    },
    isPromotedToLevel200: {
      type: Boolean,
      default: false
    },
    isPromotedToLevel300: {
      type: Boolean,
      default: false
    },
    isPromotedToLevel400: {
      type: Boolean,
      default: false
    },
    isGraduated: {
      type: Boolean,
      default: false
    },
    isWithdrawn: {
      type: Boolean,
      default: false
    },
    isSuspended: {
      type: Boolean,
      default: false
    },
    prefectName: {
      type: String
    },
    yearGraduated: {
      type: String
    }
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
