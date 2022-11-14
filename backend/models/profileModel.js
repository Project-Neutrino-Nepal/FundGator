const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    nationality: {
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

module.exports = model("profile", ProfileSchema);
