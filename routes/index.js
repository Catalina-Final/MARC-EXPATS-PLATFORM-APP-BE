var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ status: "ok", data: "Hello World!" });
});

const userApi = require("./userApi")
router.use("/users", userApi);

module.exports = router;
