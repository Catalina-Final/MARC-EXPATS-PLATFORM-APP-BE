const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CVSchema = Schema({
  cvOwner: { type: Schema.Types.ObjectId, required: false, ref: "Users" },
  contactInfo: Schema({
    fullName: { type: String, required: false },
    dob: { type: Date, required: false },
    email: { type: String, required: false },
    contactNo: { type: String, required: false },
    nationality: { type: String, required: false },
    address: Schema({
      ward: { type: String, required: false },
      district: { type: String, required: false },
      city: { type: String, required: false },
    }),
  }),
  tertiaryEducation: Schema({
    degreeType: { type: String, required: false },
    field: { type: String, required: false },
    establishment: { type: String, required: false },
    year: {
      type: Number,
      required: false,
      validate: function (value) {
        if (value > new Date().getFullYear())
          throw new AppError(400, "Please select a valid year");
      },
    },
  }),
  experience: [
    Schema({
      jobTitle: { type: String, required: false },
      employer: { type: String, required: false },
      beginningTime: { type: Date, required: false },
      endingTime: { type: Date, required: false },
    }),
  ],
  certifications: [
    Schema({
      certTitle: { type: String, required: false },
      dateOfCompletion: { type: Date, required: false },
    }),
  ],
  userImage: { type: String, required: false },
});

const CV = mongoose.model("CV", CVSchema);
module.exports = CV;
