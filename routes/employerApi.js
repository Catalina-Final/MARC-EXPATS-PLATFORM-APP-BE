const express = require("express");
const router = express.Router();
const passport = require("passport");
const validators = require("../middlewares/validators");
const { body } = require("express-validator");
const employerController = require("../controllers/employer.controller");

/**
 * @route GET api/employer/all
 * @description get all employers
 * @access Public
 */
router.get("/all", employerController.getAllEmployers);

module.exports = router;
