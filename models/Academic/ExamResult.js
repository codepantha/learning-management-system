const mongoose = require('mongoose');

const { Schema: { Types } } = mongoose;

const ExamResultSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    exam: {
      type: Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    status: {
      type: String,
      required: true,
      enum: ['failed', 'passed'],
      default: 'failed',
    },
    remarks: {
      type: String,
      required: true,
      enum: ['excellent', 'good', 'poor'],
      default: 'poor',
    },
    position: {
      type: Number,
      required: true,
    },
    subject: {
      type: Types.ObjectId,
      ref: 'Subject',
    },
    classLevel: {
      type: Types.ObjectId,
      ref: 'ClassLevel',
    },
    academicTerm: {
      type: Types.ObjectId,
      ref: 'AcademicTerm',
      required: true,
    },
    academicYear: {
      type: Types.ObjectId,
      ref: 'AcademicYear',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)
