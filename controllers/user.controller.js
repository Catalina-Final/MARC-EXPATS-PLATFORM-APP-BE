const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User.js");
const Employer = require("../models/Employer");
const utilsHelper = require("../helpers/utils.helper");
const { emailHelper } = require("../helpers/email.helper");
const FRONTEND_URL = process.env.FRONTEND_URL;
const bcrypt = require("bcryptjs");
const userController = {};

// Handle new user registration. Stores relevant data in User Model.

userController.register = catchAsync(async (req, res, next) => {
  let { surname, firstName, gender, email, password, accType } = req.body;
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
    gender,
    email,
    password,
    accType,
    emailVerificationCode,
    emailVerified: false,
  });

  // Generate an access token for the user
  const accessToken = await user.generateToken();

  const verificationURL = `${FRONTEND_URL}/verify/${emailVerificationCode}`;
  const emailData = await emailHelper.renderEmailTemplate(
    "verify_email",
    { name: firstName, code: verificationURL },
    email
  );
  if (!emailData.error) {
    emailHelper.send(emailData);
  } else {
    return next(new AppError(500, emailData.error, "Create Email Error"));
  }

  // Response sent to utilsHelper to confirm successful registration
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "New User Registration Successful"
  );
});

userController.updateEmployerDetails = catchAsync(async (req, res, next) => {
  let { formData } = req.body;

  let employerDetails = await Employer.create(formData);

  return sendResponse(
    res,
    200,
    true,
    { employerDetails },
    null,
    "Employer details updated successfull"
  );
});

userController.verifyEmail = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  let user = await User.findOne({
    emailVerificationCode: code,
  });
  if (!user) {
    return next(
      new AppError(400, "Invalid Verification Code", "Verify Email Error")
    );
  }
  user = await User.findByIdAndUpdate(
    user._id,
    {
      $set: { isEmailVerified: true },
      $unset: { emailVerificationCode: 1 },
    },
    { new: true }
  );
  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  return sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "Get current user successful"
  );
});

userController.getUserJobApplications = catchAsync(async (req, res, next) => {
  const jobApps = await User.findById(req.userId).populate("jobApplications");

  if (!jobApps) return next(new AppError(404, "Job applications not found"));

  return sendResponse(
    res,
    200,
    true,
    { jobApps },
    null,
    "Get current user applications successful"
  );
});

userController.getMyJobs = catchAsync(async (req, res, next) => {
  const userId = req.userId

  const myJobs = await Employer.findOne({recruiterId: userId}).populate("recruiterJobs");

  if (!myJobs) return next(new AppError(404, "Recruiter jobs not found"));

  return sendResponse(
    res,
    200,
    true,
    myJobs.recruiterJobs,
    null,
    "Get current employer jobads successful"
  );
});

module.exports = userController;

// /users/me/cv
// find User > User.findById(req.uesrId).populate("jobApplications")
