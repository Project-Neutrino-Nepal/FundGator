// profile model

const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",

        },
        location: {
            type: String,
        },
        bio: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },

        skills: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("profile", ProfileSchema);
