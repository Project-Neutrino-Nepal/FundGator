const { model, Schema } = require("mongoose");

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: [
      {
        type: Schema.Types.ObjectId,
        ref: "chat",
      },
    ]
  },
  { timestamps: true }
);

const Message = model("message", MessageSchema);
module.exports = Message;
