const mongoose = require('mongoose');

const {
  Schema: { Types }
} = mongoose;

const ExamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    subject: {
      type: Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    program: {
      type: Types.ObjectId,
      ref: 'Program',
      required: true
    },
    passMark: {
      type: Number,
      required: true,
      default: 50
    },
    totalMark: {
      type: Number,
      required: true,
      default: 100
    },
    duration: {
      type: String,
      required: true,
      default: '30 minutes'
    },
    examDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    examTime: {
      type: String,
      required: true
    },
    examType: {
      type: String,
      required: true,
      default: 'Quiz'
    },
    examStatus: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'live']
    },
    questions: [
      {
        type: Types.ObjectId,
        ref: 'Question'
      }
    ],
    classLevel: {
      type: Types.ObjectId,
      ref: 'ClassLevel',
      required: true
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    academicTerm: {
      type: Types.ObjectId,
      ref: 'AcademicTerm',
      required: true
    },
    academicYear: {
      type: Types.ObjectId,
      ref: 'AcademicYear',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', ExamSchema);
