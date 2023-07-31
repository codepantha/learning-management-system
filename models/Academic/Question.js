const mongoose = require('mongoose');

const {
  Schema: { Types }
} = mongoose;

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    optionA: {
      type: String,
      required: true
    },
    optionB: {
      type: String,
      required: true
    },
    optionC: {
      type: String,
      required: true
    },
    optionD: {
      type: String,
      required: true
    },
    correctAnswer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'Teacher',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
