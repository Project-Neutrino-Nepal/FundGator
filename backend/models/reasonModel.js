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
  team: [
    {
      image: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      position: {
        type: String,
        required: false,
      },
      accomplished: {
        type: String,
        required: false,
      },
      userfblink: {
        type: String,
        required: false,
      },
      userlinkedinlink: {
        type: String,
        required: false,
      },
      foundertype: {
        type: String,
        required: false,
      },
      jobtype: {
        type: String,
        required: false,
      },
    },
  ],
});

const Reason = model("reason", ReasonSchema);

module.exports = Reason;
