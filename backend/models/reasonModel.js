// create model for reason
const { model, Schema } = require("mongoose");
const ReasonSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
  },

  reason0: {
    type: String,
  },
  reason1: {
    type: String,
  },
  reason2: {
    type: String,
  },
  reason3: {
    type: String,
  },
  reason4: {
    type: String,
  },
  reason5: {
    type: String,
  },
  reason6: {
    type: String,
  },
  reason7: {
    type: String,
  },
  reason8: {
    type: String,
  },
  city: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },

  companylink: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
});

const Reason = model("reason", ReasonSchema);

module.exports = Reason;
