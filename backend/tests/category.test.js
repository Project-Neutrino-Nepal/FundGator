const User = require("../models/userModel");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

// const url = "mongodb+srv://Tulsi:qwerty12345@cluster0.bcsf13g.mongodb.net/?retryWrites=true&w=majority";
const url =
  "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/FundGator?retryWrites=true&w=majority";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});


//testing to create Category
describe("Admin Schema test For creating category", () => {
  it("Add admin to create category", async () => {
    const status = await Category.create({
      name: "test category",
    description: "test description",
    });
    expect(status.ok);
  });
});


//testing to update category
describe("Admin Schema test For updating Category", () => {
  it("Add admin to update Category", async () => {
    const status = await Category.updateOne({ _id: Object("638b140f0d5e509a4e8cec9d") },
      {
        $set: {
            description: "test test",
        
        }
      });
    expect(status.ok);
  });
});


// //testing for getting company by name
// describe("Company Schema test For deleting", () => {
//   it("Add User to delete company", async () => {
//     const status = await Company.findOne({ name: "softwarica" });
//     expect(status.ok);
//   });
// });


