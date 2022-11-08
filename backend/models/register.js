const mongoose = require("mongoose");

//register schema
const registerSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    date: {type:Date, default:Date.now}
});

const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;