const User = require("../models/userModel");
const mongoose = require("mongoose");
const tag = require("../models/tagModel");

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

//testing to create tag
describe("Tag Schema test For creating tags", () => {
  it("Add admin to create tag", async () => {
    const status = await tag.create({
      name: "test tag",
      color: "test color",
    });
    expect(status.ok);
  });
});

//testing to update tag
describe("Tag Schema test For updating tag", () => {
  it("Add admin to update tag", async () => {
    const status = await tag.updateOne({ _id: Object("638c2d2b5aa56d4f34b1fc7c") },{
        $set: {
          color: "test red",
        },});
    expect(status.ok);
  });
});

//testing to delete tag
describe("Tag Schema test For deleting tag", () => {
    it("Add admin to delete tag", async () => {
        const status = await tag.deleteOne({ _id: Object("638c2f3fc7fd68e1e0508533") });
        expect(status.ok);
    });
});


//testing to create Category
// describe("Admin Schema test For creating category", () => {
//   it("Add admin to create category", async () => {
//     const status = await Category.create({
//       name: "test category",
//     description: "test description",
//     });
//     expect(status.ok);
//   });
// });

//testing to update category
// describe("Admin Schema test For updating Category", () => {
//   it("Add admin to update Category", async () => {
//     const status = await Category.updateOne({ _id: Object("638b140f0d5e509a4e8cec9d") },
//       {
//         $set: {
//             description: "test test",
//         }
//       });
//     expect(status.ok);
//   });
// });

// //testing for getting company by name
// describe("Company Schema test For deleting", () => {
//   it("Add User to delete company", async () => {
//     const status = await Company.findOne({ name: "softwarica" });
//     expect(status.ok);
//   });
// });
