const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const CV = require("../models/CV");
// const utilsHelper = require("../helpers/utils.helper");
const cvController = {};

cvController.submitCv = catchAsync(async (req, res, next) => {
  let { formData } = req.body;
  const cvOwner = req.userId;

  console.log(formData);

  // let cv = await CV.create(formData, cvOwner);
  let cv = await CV.findOne({ cvOwner });

  if (cv)
    return next(new AppError(409), "CV already exists", "Duplication Error");

  cv = await CV.create({
    ...req.body,
  });

  return sendResponse(res, 200, true, { cv }, null, "CV submit successfull");
});

module.exports = cvController;
