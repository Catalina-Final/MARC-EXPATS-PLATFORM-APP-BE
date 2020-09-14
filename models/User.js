const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const userSchema = Schema({
  surname: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  emailVerificationCode: { type: String, select: false },
  isEmailVerified: { type: Boolean, required: true, default: false },
  accType: {
    type: String,
    required: true,
    enum: ["client", "employer", "leasee"],
    default: "client",
  },
  isDeleted: { type: Boolean, required: true, default: false },
});

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;