const mongoose = require('mongoose');

const {
  Schema: { Types }
} = mongoose;

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
      type: Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    // students will be added to the class level when they are registered
    students: [
      {
        type: Types.ObjectId,
        ref: 'Student'
      },
    ],
    // optional
    subjects: [
      {
        type: Types.ObjectId,
        ref: 'Subject'
      }
    ],
    teachers: [
      {
        type: Types.ObjectId,
        ref: 'Teacher',
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassLevel', ClassLevelSchema);
