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

const VerifyNotificationSchema = new Schema(
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
     readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
     ]
  },

  { timestamps: true }
);

const Notification = model("notification", NotificationSchema);
const VerifyNotification = model(
  "verifynotification",
  VerifyNotificationSchema
);
// module.exports = Notification;
module.exports = { Notification, VerifyNotification };
