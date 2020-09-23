const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Employer = require("../models/Employer");
// const utilsHelper = require("../helpers/utils.helper");
const employerController = {};

employerController.getAllEmployers = catchAsync(async (req, res, next) => {
  const employers = await Employer.find({});

  return sendResponse(
    res,
    200,
    true,
    { employers },
    null,
    "Fetch employers successfull"
  );
});

module.exports = employerController;
