const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authentication")
const { body } = require("express-validator");
const jobController = require("../controllers/job.controller");

/**
 * @route GET api/jobs?page=1&limit=10 - Get jobs with pagination
 * @route GET api/jobs/:id/jobs?page=1&limit=20 - Get blogs from employer
 * @route GET api/jobs/:id - Get job details
 * @route POST api/jobs/:id - Create a new job ad
 * @route PUT api/jobs/:id - Update a job ad
 * @route DELETE api/jobs/:id - Remove a job ad
 */

/**
 * @route POST api/jobs/employer/submit
 * @description Submit a job ad
 * @access Public
 */
router.post("/employer/submit", jobController.submitJobAd);

/**
 * @route GET api/jobs
 * @description Get all job ads
 * @access Public
 */
router.get("/", jobController.getJobAds)

module.exports = router;
