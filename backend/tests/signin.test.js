// test for signin

const User = require("../models/userModel");
//const request = require('supertest');
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
  it("Add User testing login", () => {
    return User.findOne({ _id: Object("6374f3c1e3b3cdbe1bf1bbd6") }).then(
      (result) => {
        expect(result.email).toEqual("ktm@gmail.com");
      }
    );
  });
});
