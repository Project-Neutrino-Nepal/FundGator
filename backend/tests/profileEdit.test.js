const User = require('../models/userModel');
const mongoose =  require('mongoose');
const Profile = require('../models/profileModel');

// const url = "mongodb+srv://Tulsi:qwerty12345@cluster0.bcsf13g.mongodb.net/?retryWrites=true&w=majority";
const url  = "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/FundGator?retryWrites=true&w=majority";


beforeAll(async () => {
    await mongoose.connect(url, {
    useNewUrlParser: true });
   });
   afterAll(async () => {
    await mongoose.connection.close();
   });

// testing to update profile 
describe('User Schema test For updating profile', () => {
    it('Add User testing updating profile', async () => {
        const status = await Profile.updateOne({ _id: Object("638b0cdedb35f380e0f84ee6") },
        { $set: {
            name: "testing tdd",
        }});
        expect(status.ok);
    });
});

// testing to delete profile
describe('User Schema test For deleting profile', () => {
    it('Add User testing deleting profile', async () => {
        const status = await Profile.deleteOne({ _id: Object("638b0cdedb35f380e0f84ee6") });
        expect(status.ok);
    });
});






//    describe("Admin Schema test For updating Category", () => {
//     it("Add admin to update Category", async () => {
//       const status = await Category.updateOne({ _id: Object("638b140f0d5e509a4e8cec9d") },
//         {
//           $set: {
//               description: "test test",   
//           }
//         });
//       expect(status.ok);
//     });
//   });


// describe('User Schema test For updating', () => {
//     // Testing for updating user
//     it('Add User testing updating', () => {
//         return User.findOneAndUpdate({_id : Object('637752fe4053d5b4c0cff2e9')},{$set : {name:"test"}})
//         .then((result) => {
//             expect(result.name).toEqual("Shivakoti");
//         });
//     });
// })

// describe('User Schema test For deleting', () => {
//     it('Add User testing deleting', async() => {
//         const status = await Profile.deleteOne({_id : Object('6378fad0f683e4c34992d9eb')})
//         expect(status.ok);
//     });
// })





