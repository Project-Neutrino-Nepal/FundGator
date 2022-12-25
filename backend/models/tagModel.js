// model for Companies tags
const { model, Schema } = require("mongoose");

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tag = model("tag", TagSchema);
module.exports = Tag;
