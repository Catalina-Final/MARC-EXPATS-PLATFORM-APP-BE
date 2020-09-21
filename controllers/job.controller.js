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

  return sendResponse(
    res,
    200,
    true,
    { jobAd },
    null,
    "Job ad submit successfull"
  );
});

jobController.getJobAds = catchAsync(async (req, res, next) => {
  const jobAds = await Job.find({});

  return sendResponse(
    res,
    200,
    true,
    { jobAds },
    null,
    "Fetch ads successfull"
  );
});

jobController.getSingleJob = catchAsync(async (req, res, next) => {
  const jobAd = await Job.findById(req.params.id);

  if (!jobAd) return next(new AppError(404, "Job not found"));

  return sendResponse(
    res,
    200,
    true,
    jobAd,
    null,
    "get single job ad successful"
  );
});

module.exports = jobController;
