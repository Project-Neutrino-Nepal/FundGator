// model for overview
const { Schema, model } = require("mongoose");
const OverviewSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
  },

  highlight: {
    type: String,
  },
  founder: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  AboutProduct: {
    type: String,
  },
});

const Overview = model("overview", OverviewSchema);
module.exports = Overview;
