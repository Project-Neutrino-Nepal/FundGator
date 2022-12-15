const User = require("../models/userModel");
const mongoose = require("mongoose");
const Post = require("../models/postModel");



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

//testing to create post reference user
describe("Post Schema test For creating post", () => {
    it("Add user to create post", async () => {
        const status = await Post.create({

            
           text :"test",

        });
        expect(status.ok);
    });
});

// testing to get all post 
describe("Post Schema test  finding all post", () => {
    it("Add user to get all post", async () => {

        const status = await Post.find();
        expect(status.ok);
    });
});


















