const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    legal_name: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    cit_front: {
      type: String,
    },
    cit_back: {
      type: String,
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    website: {
      type: String,
    },
    pan_No: {
      type: String,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
    },
    status: {
      type: String,
    },

    skills: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = model("profile", ProfileSchema);
module.exports = Profile;
