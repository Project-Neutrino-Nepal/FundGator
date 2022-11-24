const mongoose = require("mongoose");

const  db = process.env.DB;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});