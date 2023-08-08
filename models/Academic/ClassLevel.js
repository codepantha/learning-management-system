const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    // students will be added to the class level when they are registered
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student'
      },
    ],
    // optional
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassLevel', ClassLevelSchema);
