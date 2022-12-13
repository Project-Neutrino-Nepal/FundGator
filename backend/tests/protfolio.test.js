const User = require("../models/userModel");
const mongoose = require("mongoose");

const Portfolio = require("../models/portfolioModel");
const bodyParser = require("body-parser");

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
 
//testing to create portfolio of the authenticated investor
describe("Portfolio Schema test For creating portfolio", () => {

    it("Add user to create portfolio", async () => {
        const status = await Portfolio.create({
            amount:500,
            shares: 5,
            company: "638aea211af5d85efbfa9af3",






           

        });
        expect(status.ok);
    });
});




