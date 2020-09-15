const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CVSchema = Schema({
  cvOwner: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  contactInfo: Schema({
    fullName: { type: String, required: true },
    age: {
      type: Number,
      validate: function (value) {
        if (value > 80) {
          throw new AppError(400, "Please select a valid age");
        } else if (value < 18) {
          throw new AppError(400, "Please select a valid age");
        }
      },
    },
    email: { type: String, required: true },
    contactNo: { type: String },
    nationality: { type: String, required: true },
    address: Schema({
      streetNo: { type: String },
      streetName: { type: String },
      ward: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
    }),
  }),
  tertiaryEducation: Schema({
    degreeType: { type: String, required: true },
    field: { type: String, required: true },
    establishment: { type: String, required: true },
    year: {
      type: Number,
      required: true,
      validate: function (value) {
        if (value > new Date().getFullYear())
          throw new AppError(400, "Please select a valid year");
      },
    },
  }),
  experience: [
    Schema({
      jobTitle: { type: String, required: true },
      employer: { type: String, required: true },
      beginningTime: { type: Date, required: true },
      endingTime: { type: Date, required: true },
    }),
  ],
  certifications: [
    Schema({
      certTitle: { type: String, required: true },
      dateOfCompletion: { type: Date, required: true },
    }),
  ],
  userImage: { type: String, required: false },
});

const CV = mongoose.model("CV", CVSchema);
module.exports = CV;
