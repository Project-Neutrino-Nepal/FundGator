const User = require("../models/userModel");
const mongoose = require("mongoose");
const reason = require("../models/reasonModel")

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


//testing to create reason to invest in company 
describe("Company Schema test For creating reason", () => {
    it("Add Company to create reason", async () => {
        const status = await reason.create({
            reason0:"test",
            reason1:"test1",
            reason2:"test2",
            reason3:"test3",
            reason4:"test4",
            reason5:"test5",
            reason6:"test6",
            reason7:"test7",
            reason8:"test8"
        });
        expect(status.ok);
    });
});


//testing to get company reason
describe("Company Schema test For getting reason", () => {
    it("Add company to get reason", async () => {
        const status = await reason.findOne({reason0:"test"});
        expect(status.ok);
    });
});

//testing to get reason by company id
describe("Company Schema test For getting reason by id", () => {
    it("Add company to get reason by id", async () => {
        const status = await reason.findOne({ _id: Object("638c1be5414e8ba603221d4a"),
        reason0:"This is first Reasons",
        reason1:"This is second Reasons",
    });
        expect(status.ok);
    });
});




