const { model, Schema } = require("mongoose");

const QuestionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Questions = model("questions", QuestionsSchema);
module.exports = Questions;
