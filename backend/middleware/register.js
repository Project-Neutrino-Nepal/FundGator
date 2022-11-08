//for user registration

const express = require('express');
const router = express.Router();
const Register = require('../models/register');

const userRegister = async (req, res) => {
    try {
        const registerUser = new Register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const registered = await registerUser.save();
        res.status(201).send(registered);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.userRegister = userRegister;


