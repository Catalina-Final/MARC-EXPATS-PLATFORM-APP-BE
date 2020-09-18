const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = Schema({
  jobOwnerId: { type: Schema.Types.ObjectId, required: false, ref: "Users" },
  jobOverview: Schema({
    jobTitle: { type: String, required: false },
    salary: { type: String, required: false },
    location: { type: String, required: false },
    contractType: { type: String, required: false },
    employer: { type: String, required: false },
    startDate: { type: String, required: false },
  }),
  jobDetails: Schema({
    description: { type: String, required: false },
    requiredQualifications: { type: String, required: false },
    requiredSkills: { type: String, required: false },
    requiredCharacteristics: { type: String, required: false },
    incentives: { type: String, required: false },
    bonuses: { type: String, required: false },
  }),
  jobBannerImage: { type: String, required: false },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
