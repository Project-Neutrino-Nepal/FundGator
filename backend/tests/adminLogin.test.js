const User = require("../models/userModel");
const mongoose = require("mongoose");
const url  = "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/FundGator?retryWrites=true&w=majority";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

//AdminLogin test

describe("User Schema test For login", () => {
  it("Add User testing login", () => {
    return User.findOne({ _id: Object("6380a5c61fab8643d46b389e") }).then(
      (result) => {
        expect(result.email).toEqual("ymilan593@gmail.com");
      }
    );
  });
});




