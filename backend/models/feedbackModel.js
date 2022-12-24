const { model, Schema } = require("mongoose");

const FeedBackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profile",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
    feedback: {
      type: String,
      required: true,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const FeedBack = model("feedback", FeedBackSchema);
module.exports = FeedBack;
