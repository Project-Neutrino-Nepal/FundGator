//route for register

const express = require("express");
const router = express.Router();
const { userRegister } = require("../apis/registerApi");

router.post("/register", userRegister);

module.exports = router;
