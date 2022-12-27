// categories of Investment
const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Category = model("category", CategorySchema);
module.exports = Category;
