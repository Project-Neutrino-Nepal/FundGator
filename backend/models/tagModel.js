// model for Companies tags
const { model, Schema } = require("mongoose");

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});

const Tag = model("tag", TagSchema);
module.exports = Tag;
