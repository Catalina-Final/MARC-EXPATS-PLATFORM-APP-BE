const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Job = require("../models/Job");
// const utilsHelper = require("../helpers/utils.helper");
const jobController = {};

jobController.submitJobAd = catchAsync(async (req, res, next) => {
  let { formData } = req.body;

  console.log(formData);

  let jobAd = await Job.create(formData);

  return sendResponse(res, 200, true, { jobAd }, null, "Job ad submit successfull");
});

module.exports = jobController;
