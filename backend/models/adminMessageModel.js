const { model, Schema } = require("mongoose");

const AdminMessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "profile",
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const AdminMessage = model("adminMessage", AdminMessageSchema);
module.exports = AdminMessage;
       