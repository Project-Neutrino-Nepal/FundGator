const compare = require("bcryptjs").compare;
const hash = require("bcryptjs").hash;
const { randomBytes } = require("crypto");
const { sign } = require("jsonwebtoken");
const { pick } = require("lodash");
const { model, Schema } = require("mongoose");
const SECRET = require("../constants/index");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    isFirstTime: {
      type: Boolean,
      default: true,
    },
    // only admin can change the status
    status: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpiresIn: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  user.password = await hash(user.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

UserSchema.methods.generateJWT = async function () {
  let payload = {
    email: this.email,
    name: this.name,
    id: this._id,
  };
  return await sign(payload, SECRET, { expiresIn: "1 day" });
};

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordExpiresIn = Date.now() + 36000000;
  this.resetPasswordToken = randomBytes(20).toString("hex");
};

UserSchema.methods.getUserInfo = function () {
  return pick(this, [
    "_id",
    "name",
    "email",
    "verified",
    "admin",
    "isFirstTime",
    "status",
  ]);
};

const User = model("user", UserSchema);
module.exports = User;
