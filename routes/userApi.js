/**
 * @route POST api/users - Register
 * @route GET api/users?page=1&limit=20
 * @route GET api/users/me - Get current user
 * @route POST api/users/me/avatar - Upload avatar
 * @route POST api/users/me/cv - Upload CV
 * @route PUT api/users/me - Update user info
 * @route PUT api/users/me/password - Change Password
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const validators = require("../middlewares/validators.js");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authentication.js");

/**
 * @route POST api/users 
 * @description Register a new user
 * @access Public
 */

router.post(
  "/register",
  validators.validate([
    body("surname", "Surname required").exists().notEmpty(),
    body("firstName", "First name required").exists().notEmpty(),
    body("email", "Email required").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Password required").exists().notEmpty(),
    body("password", "Password must be at least 6 characters long")
      .exists()
      .isLength(6),
  ]),
  userController.register
);
