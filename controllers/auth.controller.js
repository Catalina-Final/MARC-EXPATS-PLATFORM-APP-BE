const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "+password");
  if (!user)
    return next(new AppError(400, "Invalid email or password", "Login Error"));

  if (!user.isEmailVerified)
    return next(
      new AppError(406, "Please verify your email address", "Login Error")
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next(
      new AppError(400, "Incorrect password or email", "Login Error")
    );

  accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});

module.exports = authController;
