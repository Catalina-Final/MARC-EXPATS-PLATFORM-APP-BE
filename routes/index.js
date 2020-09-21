var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Hello World!" });
});

//  userApi
const userApi = require("./userApi");
router.use("/users", userApi);

// authApi
const authApi = require("./authApi");
router.use("/auth", authApi);

//  jobApi
const jobApi = require("./jobApi");
router.use("/jobs", jobApi);

module.exports = router;
