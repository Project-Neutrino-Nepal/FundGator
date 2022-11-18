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
    tax_ID_No: {
      type: String,
    },
    passport_No: {
      type: String,
    },
    passport_Expiry: {
      type: String,
    },
    passport_Issue_country: {
      type: String,
    },
    passport_Issue_date: {
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
module.exports   = Profile;