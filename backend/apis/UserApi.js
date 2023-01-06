const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const { randomBytes } = require("crypto");
const { join } = require("path");
// const DOMAIN = require("../constants/index") || "http://127.0.0.1:5000/";
const sendMail = require("../functions/email-sender");
const DOMAIN = "http://127.0.0.1:5000/";
const RegisterValidations = require("../validators/user-validators");
const validator = require("../middlewares/validator-middleware");
const userAuth = require("../middlewares/auth-guard");
const Validator = require("../middlewares/validator-middleware");
const ContactUs = require("../models/contactUsModel");
const axios = require("axios");

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */

router.post(
  "/api/register",
  RegisterValidations,
  validator,
  async (req, res) => {
    try {
      let { email } = req.body;

      // Check if the user exists with that email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message:
            "Email is already registered. Did you forget the password. Try resetting it.",
        });
      }
      user = new User({
        ...req.body,
        verificationCode: randomBytes(20).toString("hex"),
      });
      await user.save();
      const link = `${DOMAIN}users/verify-now/${user.verificationCode}`;
      // Send the email to the user with a varification link
      let html = `
        <div>
            <h1>Hello, ${user.name}</h1>
            <p>Please click the following link to verify your account</p>
            <a href="${link}">Verify Now</a>
        </div>
    `;
      await sendMail(
        user.email,
        "Verify Account",
        "Please verify Your Account.",
        html
      );
      // create profile for the user
      const profile = new Profile({
        user: user._id,
        email: user.email,
        name: user.name,
      });
      await profile.save();

      return res.status(201).json({
        success: true,
        message:
          "Hurray! your account is created please verify your email address.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
  }
);

/**
 * @description To login a User
 * @api /users/api/login
 * @access PUBLIC
 * @type POST
 */

router.post("/api/login", LoginValidations, validator, async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    if (user.status != true) {
      return res.status(401).json({
        success: false,
        message:
          "Your account is suspended, Please contact Admin to Reactivate your Account.",
      });
    }
    if (user.verified != true) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized access. Please verify your account email has been sent.",
      });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      token: `Bearer ${token}`,
      message: "Hurray! You are now logged in.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To login a User from google
 * @api /users/api/google-login
 * @access PUBLIC
 * @type POST
 */

router.post("/api/google-login", async (req, res) => {
  try {
    let { email, name, googleId, avatar } = req.body;
    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });
    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        verified: true,
      });
      await user.save();
      // create profile for the user
      const profile = new Profile({
        user: user._id,
        email: user.email,
        name: user.name,
        avatar: avatar,
      });
      await profile.save();
    } else if (user.googleId != googleId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    } else if (user.status != true) {
      return res.status(401).json({
        success: false,
        message:
          "Your account is suspended, Please contact Admin to Reactivate your Account.",
      });
    } else if (user.verified != true) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized access. Please verify your account email has been sent.",
      });
    }

    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      token: `Bearer ${token}`,
      message: "Hurray! You are now logged in.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To get access token from linkedin
 * @api /users/api/linkedin-access-token?code=123
 * @access PUBLIC
 * @type Get
 */

router.get("/api/linkedin-access-token", async (req, res) => {
  try {
    let { code } = req.query;
    let { CLIENT_ID, CLIENT_SECERT } = process.env;
    console.log(code);
    console.log(CLIENT_ID);
    console.log(CLIENT_SECERT);

    let { data } = await axios.post(
      // get access token from linkedin
      `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/signin&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECERT}`
    );
    // get user data from linkedin
    let { data: userData } = await axios.get(
      // get user data from linkedin
      `https://api.linkedin.com/v2/me?projection=(id,email,firstName,lastName,profilePicture(displayImage~:playableStreams))`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );
    let { id, firstName, lastName, profilePicture } = userData;
    let email = `${firstName.localized[Object.keys(firstName.localized)[0]]}.${
      lastName.localized[Object.keys(lastName.localized)[0]]
    }@linkedin.com`;
    let avatar =
      profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
    let user = await User.findOne({
      $or: [{ email }, { linkedinId: id }],
    });
    if (!user) {
      user = new User({
        email,
        name: `${firstName.localized[Object.keys(firstName.localized)[0]]} ${
          lastName.localized[Object.keys(lastName.localized)[0]]
        }`,
        linkedinId: id,
        verified: true,
      });
      await user.save();
      // create profile for the user
      const profile = new Profile({
        user: user._id,
        email: user.email,
        name: user.name,
        avatar: avatar,
      });
      await profile.save();
    } else if (user.linkedinId != id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access.",
      });
    } else if (user.status != true) {
      return res.status(401).json({
        success: false,
        message:
          "Your account is suspended, Please contact Admin to Reactivate your Account.",
      });
    } else if (user.verified != true) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized access. Please verify your account email has been sent.",
      });
    }
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      message: "Hurray! You are now logged in.",
      token: `Bearer ${await user.generateJWT()}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To verify a new user's account via email
 * @api /users/verify-now/:verificationCode
 * @access PUBLIC <Only Via email>
 * @type GET
 */

router.get("/verify-now/:verificationCode", async (req, res) => {
  try {
    let { verificationCode } = req.params;
    let user = await User.findOne({ verificationCode });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Invalid verification code.",
      });
    }
    user.verified = true;
    user.verificationCode = undefined;
    await user.save();
    return res.sendFile(
      join(__dirname, "../templates/verification-success.html")
    );
  } catch (err) {
    console.log("ERR", err.message);
    return res.sendFile(join(__dirname, "../templates/errors.html"));
  }
});

/**
 * @description To update a user
 * @api /users/api/update-user
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/update-user/", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let updateUser = await User.findByIdAndUpdate(
      user,
      {
        isFirstTime: false,
      },
      { new: true }
    );
    return res.status(200).json({
      updateUser,
      success: true,
      message: "Hurray! Your account has been updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To get number of users
 * @api /users/api/get-no-users
 * @access PRIVATE
 * @type GET
 * */

router.get("/api/get-no-users", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const noUsers = await User.countDocuments();
    return res.status(200).json({
      noUsers,
      success: true,
      message: "Hurray! Your account has been updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To suspend a user account by admin
 * @api /users/api/suspend-user/:userId
 * @access PRIVATE
 * @type PUT
 */

router.put("/api/suspend/:userId", async (req, res) => {
  try {
    let { userId } = req.params;
    let userToSuspend = await User.findById(userId);
    if (!userToSuspend) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    userToSuspend.status = false;
    await userToSuspend.save();
    return res.status(200).json({
      success: true,
      message: "Hurray! User account has been suspended.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To unsuspend a user
 * @api /users/api/activate/:userId
 * @access PRIVATE
 * @type PUT
 * */

router.put("/api/activate/:userId", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.userId, {
      status: true,
    });
    return res.status(200).json({
      updateUser,
      success: true,
      message: "User has been activated! Successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To change the password by Authenticated user
 * @api /users/api/change-password
 * @access Private
 * @type PUT
 */

router.put("/api/change-password", userAuth, function (req, res) {
  const userID = req.user._id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  console.log(userID, oldPassword, newPassword);
  User.findById(userID, function (err, user) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (!user.comparePassword(oldPassword)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
    user.password = newPassword;
    user.save(function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "An error occurred.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Password changed successfully.",
      });
    });
  });
});

/**
 * @description To initiate the password reset process
 * @api /users/api/reset-password
 * @access Public
 * @type POST
 */
router.put(
  "/api/reset-password",
  ResetPassword,
  Validator,
  async (req, res) => {
    try {
      let { email } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User with the email is not found.",
        });
      }
      user.generatePasswordReset();
      await user.save();
      // Sent the password reset Link in the email.
      let html = `
        <div>
            <h1>Hello, ${user.name}</h1>
            <p>Please click the following link to reset your password.</p>
            <p>If this password reset request is not created by your then you can inore this email.</p>
            <a href="${DOMAIN}users/reset-password-now/${user.resetPasswordToken}">Verify Now</a>
        </div>
      `;
      await sendMail(
        user.email,
        "Reset Password",
        "Please reset your password.",
        html
      );
      return res.status(200).json({
        success: true,
        message: "Password reset link is sent your email.",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "An error occurred.",
      });
    }
  }
);

/**
 * @description To resnder reset password page
 * @api /users/reset-password/:resetPasswordToken
 * @access Restricted via email
 * @type GET
 */
router.get("/reset-password-now/:resetPasswordToken", async (req, res) => {
  try {
    let { resetPasswordToken } = req.params;
    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpiresIn: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      });
    }
    return res.sendFile(join(__dirname, "../templates/password-reset.html"));
  } catch (err) {
    return res.sendFile(join(__dirname, "../templates/errors.html"));
  }
});

/**
 * @description To reset the password
 * @api /users/api/reset-password-now
 * @access Restricted via email
 * @type POST
 */
router.post("/api/reset-password-now", async (req, res) => {
  try {
    let { resetPasswordToken, password } = req.body;
    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpiresIn: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresIn = undefined;
    await user.save();
    // Send notification email about the password reset successfull process
    let html = `
        <div>
            <h1>Hello, ${user.name}</h1>
            <p>Your password is resetted successfully.</p>
            <p>If this rest is not done by you then you can contact our team.</p>
        </div>
      `;
    await sendMail(
      user.email,
      "Reset Password Successful",
      "Your password is changed.",
      html
    );
    return res.status(200).json({
      success: true,
      message:
        "Your password reset request is complete and your password is resetted successfully. Login into your account with your new password.",
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Something went wrong.",
    });
  }
});

/**
 * @description To post users message to the admin
 * @api /users/api/contact-us
 * @access Public
 * @type POST
 */

router.post("/api/contact-us", async (req, res) => {
  try {
    let { body } = req;
    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Please enter your message.",
      });
    }

    let contact = new ContactUs({
      ...body,
    });
    await contact.save();
    if (contact) {
      return res.status(200).json({
        success: true,
        message: "Your message is sent to the admin.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

/**
 * @description To Get all contact us messages by admin
 * @api /users/api/contact-us
 * @access Public
 * @type Get
 */

router.get("/api/contact-us", userAuth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.admin === true) {
      let contact = await ContactUs.find();
      if (contact) {
        return res.status(200).json({
          success: true,
          message: "All contact us messages.",
          contact,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
});

module.exports = router;
