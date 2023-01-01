const { model, Schema } = require("mongoose");

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const Notification = model("notification", NotificationSchema);
module.exports = Notification;