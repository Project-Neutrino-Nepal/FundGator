//route for register

const express = require('express');
const router = express.Router();
const { userRegister } = require('../middleware/register');

router.post('/register', userRegister);

module.exports = router;
