// models for company data
const { model, Schema } = require("mongoose");

const CompanySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profile",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    reasons: [
      {
        type: String,
      },
    ],

    verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
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
    tax_ID_No: {
      type: String,
    },
    address: {
      type: String,
    },
    short_pitch: {
      type: String,
    },
    tax_document: {
      type: String,
    },
    company_document: {
      type: String,
    },
    company_logo: {
      type: String,
    },
    company_video: {
      type: String,
    },
    company_website: {
      type: String,
    },
    company_facebook: {
      type: String,
    },
    company_twitter: {
      type: String,
    },
    company_linkedin: {
      type: String,
    },

    raising_fund: {
      type: Boolean,
      default: true,
    },
    fund_raised: {
      type: Number,
      default: 0,
    },
    fund_goal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Company = model("company", CompanySchema);
module.exports = Company;
