const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Job = require("../models/Job");
const User = require("../models/User")
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
  let { page, limit, sortBy, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 9;  

  const totalAds = await Job.countDocuments({
    ...filter,
    // isDeleted: false,
  });
  const totalPages = Math.ceil(totalAds / limit);
  const offset = limit * (page - 1); 
  console.log({totalAds, limit, filter});

  // console.log({ filter, sortBy });
  const jobAds = await Job.find(filter)
    .sort({ ...sortBy, createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("jobOverview._id");

  return sendResponse(
    res,
    200,
    true,
    { jobAds, totalPages },
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

jobController.submitCvToEmployer = catchAsync(async (req, res, next) => {
  console.log("sdassdsdasdasdsadsadsadsa======")
  const userId = req.userId;
  const jobId = req.params.id
  const user = await User.findById(userId)
  if(!user) return next(new AppError(404, "User not found"))

// console.log(jobId)`
  const job = await Job.findByIdAndUpdate(jobId, {$addToSet: {applicants: user.cvId}}, {new:true})
  const jobApplication = await User.findByIdAndUpdate(userId, {$addToSet: {jobApplications: jobId}}, {new: true})

  console.log(jobApplication)
  // const job = await Job.findById(jobId)
  // console.log(job)
  if(!jobApplication) return next(new AppError(404, "User not found"))
  if(!job) return next(new AppError(404, "Submit CV failed"))


  return sendResponse(res, 200, true, null, null, "Submit CV successful")
})

module.exports = jobController;
