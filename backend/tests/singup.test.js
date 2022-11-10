//using the path of User Model
const User = require('../models/registerModel');
const mongoose =  require('mongoose');


const url = "mongodb+srv://Tulsi:qwerty12345@cluster0.bcsf13g.mongodb.net/?retryWrites=true&w=majority";


beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true });
});
afterAll(async () => {
 await mongoose.connection.close();
});

describe('User Schema test For inserting', () => {
    // Testing for inserting user 
     it('Add User testing inserting', () => {
     const user = {
     'name': 'sprint',
     'email' : "sprint@gmail.com",
     'password': 'agile11'
     };
     return User.create(user)
     .then((result) => {
     expect(result.name).toEqual('sprint');
     });
     });
    })




