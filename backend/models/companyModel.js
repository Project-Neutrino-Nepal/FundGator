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
    reasons: {
      type: Schema.Types.ObjectId,
      ref: "reason",
    },

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
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    tax_ID_No: {
      type: String,
    },
    address: {
      type: String,
    },
    registration_card: {
      type: String,
    },

    pan_card: {
      type: String,
    },

    citizenship_front: {
      type: String,
    },
    citizenship_back: {
      type: String,
    },

    company_video: {
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
    content: {
      type: String,
    },
    investors: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    question: [
      {
        type: Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
  
  },

 
  { timestamps: true }
);

const Company = model("company", CompanySchema);
module.exports = Company;
