
const User = require('../models/userModel');
const mongoose =  require('mongoose');


// const url = "mongodb+srv://Tulsi:qwerty12345@cluster0.bcsf13g.mongodb.net/?retryWrites=true&w=majority";
const url  = "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/FundGator?retryWrites=true&w=majority";
// testing for profile edit

beforeAll(async () => {
    await mongoose.connect(url, {
    useNewUrlParser: true });
   });
   afterAll(async () => {
    await mongoose.connection.close();
   });

describe('User Schema test For updating', () => {
    // Testing for updating user
    it('Add User testing updating', () => {
        return User.findOneAndUpdate({_id : Object('63735ff9f81253f5d8339db7')},{$set : {name:'testing '}})
        .then((result) => {
            expect(result.name).toEqual('sprint met ');
        });
    });
})





