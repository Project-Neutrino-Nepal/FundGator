
const User = require("../models/userModel");
const mongoose = require("mongoose");

const url  = "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/FundGator?retryWrites=true&w=majority";


//test for signin
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Schema test For login", () => {
  it("Add User testing login", async () => {
    const result = await User.findOne({ _id: Object("638b1a196c5845c23787bde7") });
      expect(result.email).toEqual("sprint@gmail.com");
  });
});
