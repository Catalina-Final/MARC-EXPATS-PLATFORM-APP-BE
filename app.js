const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

const utilsHelper = require("./helpers/utils.helper");
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const passport = require("passport");
require("./helpers/passport");

mongoose
  .connect(mongoURI, {
    // some options to deal with deprecated warning
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongoose connected to ${mongoURI}`);
    // require("./testing/test");
    // emailInternalHelper.createTemplatesIfNotExists();
  })
  .catch((err) => console.log(err));

  app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/api", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err);
  if (err.isOperational) {
    return utilsHelper.sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  } else {
    return utilsHelper.sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

module.exports = app;
