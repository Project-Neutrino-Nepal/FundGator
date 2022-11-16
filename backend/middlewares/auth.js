const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');
const User = require('../models/userModel');
const profile = require('../models/profileModel');

// jwt token verification

