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
describe("Admin Schema test For login", () => {
    it("Add admin to login", async () => {
      const result = await User.findOne({ _id: Object("638a54f33cac1a6957d836ac") });
      //console.log(result)
        expect(result.email).toEqual("ymilan593@gmail.com");
        
    });
  });



