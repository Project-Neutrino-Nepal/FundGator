const { model, Schema } = require("mongoose");

const QuestionsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
    
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
     
    },
  },
  { timestamps: true }
);

const Questions = model("questions", QuestionsSchema);
module.exports = Questions;
