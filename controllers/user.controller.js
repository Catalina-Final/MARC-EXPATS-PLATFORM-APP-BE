const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// Handle new user registration. Stores relevant data in User Model.

userController.register(
  (User = catchAsync(async (req, res, next) => {
    let { surname, firstName, email, password, accType } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return next(new AppError(409, "User already exists", "Register Error"));
    
    // Hash the users password for security
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // Generate a random verifcation code for user email
    const emailVerificationCode = utilsHelper.generateRandomHexString(20);

    // Creates the file in the schema
    user = await User.create({
      surname,
      firstName,
      email,
      password,
      accType,
      emailVerificationCode,
    });

    // Generate an access token for the user
    const accessToken = await user.generateToken();

    // Response sent to utilsHelper to confirm successful registration
    return sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "New User Registration Successful"
    );
  }))
);
