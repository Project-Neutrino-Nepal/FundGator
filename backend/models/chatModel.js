const { model, Schema } = require("mongoose");

const ChatSchema = new Schema({
    chatName:{
        type:String
    },
    users:[{
        type: Schema.Types.ObjectId,
      ref: "User",
    }],
    latestMessage:{
        type: Schema.Types.ObjectId,
        ref: "Message",
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const Chat = model("chat", ChatSchema);
module.exports = Chat;






