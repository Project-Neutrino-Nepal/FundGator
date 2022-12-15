const { model, Schema } = require("mongoose");

const MessageSchema = new Schema({

    
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    postdatetime: {
      type: String,
    },
  },
  { timestamps: true }

    // sender:{
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    // },
    // // receiver:{
    // //     type: Schema.Types.ObjectId,
    // //     ref: "user",
    // // },
    // content: {
    //     type: String,
    // },
    // chat: {
    //     type: Schema.Types.ObjectId,
    //     ref: "chat",
    // },
    // date: {
    //     type: Date,
    //     default: Date.now,
    // },


);

const Message = model("Message", MessageSchema);
module.exports = Message;