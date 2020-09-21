const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployerSchema = Schema({
  recruiterId: { type: Schema.Types.ObjectId, required: false, ref: "User" },
  companyName: { type: String, required: false },
  companyLocation: { type: String, required: false },
  companyLogo: { type: String, required: false },
  companyWebsite: { type: String, required: false },
  recruiterName: { type: String, required: false },
  recruiterRating: { type: String, required: false },
  recruiterJobs: { type: String, required: false },
});

const Employer = mongoose.model("Employer", EmployerSchema);
module.exports = Employer;
