const User = require("../models/userModel");
const mongoose = require("mongoose");
const Company = require("../models/companyModel");

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

//testing for getting all company
describe("Company Schema test  finding all company", () => {
  it("Add user to get all company", async () => {
    const status = await Company.find();
    expect(status.ok);
  });
});

//testing for getting company by id

describe("Company Schema test for getting Company by id", () => {
  it("Add user to get company by Id", async () => {
    const status = await Company.findOne({
      _id: Object("638ae96e1af5d85efbfa94d1"),
    });
    expect(status.ok);
  });
});

//testing to create company
describe("Company Schema test For creating company", () => {
  it("Add user to create company", async () => {
    const status = await Company.create({
      name: "Tulsi",
      email: "test@gmail.com",
      password: "qwerty123"
    });
    expect(status.ok);
  });
});


//testing to update company
describe("Company Schema test For updating company", () => {
  it("Add user to update company", async () => {
    const status = await Company.updateOne({ _id: Object("638b0a4641ff299e4fb40085") },
      {
        $set: {
          name: "Tulsi test",
          email: "testing@gmail.com",
          password: "qwerty123"
        }
      });
    expect(status.ok);
  });
});


//testing for getting company by name
describe("Company Schema test For deleting", () => {
  it("Add User to delete company", async () => {
    const status = await Company.findOne({ name: "softwarica" });
    expect(status.ok);
  });
});

//testing for getting number of company
describe("Company Schema test the number of comapny", () => {
  it("To get number of company", async () => {
    const status = await Company.count({
      _id: Object("638a53a66bb236611c0262be"),
    });
    expect(status.ok);
  });
});
