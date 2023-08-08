const mongoose = require('mongoose');

const { Schema } = mongoose;

const AcademicTermSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      default: '3 months'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AcademicTerm', AcademicTermSchema);
