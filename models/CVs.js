const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CVSchema = Schema({
  cvOwner: { type: Schema.Types.ObjectId, required: false, ref: "Users" },
  contactInfo: Schema({
    fullName: { type: String, required: true },
    dob: {type: String},
    // age: {
    //   type: Number,
    //   validate: function (value) {
    //     if (value > 80) {
    //       throw new AppError(400, "Please select a valid age");
    //     } else if (value < 18) {
    //       throw new AppError(400, "Please select a valid age");
    //     }
    //   },
    // },
    email: { type: String, required: true },
    contactNo: { type: String },
    nationality: { type: String, required: false },
    address: Schema({
      streetNo: { type: String },
      streetName: { type: String },
      ward: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
    }),
  }),
  tertiaryEducation: Schema({
    degreeType: { type: String, required: false },
    field: { type: String, required: true },
    establishment: { type: String, required: true },
    year: {
      type: Number,
      required: false,
      validate: function (value) {
        if (value > new Date().getFullYear())
          throw new AppError(400, "Please select a valid year");
      },
    },
  }),
  experience: [ Schema({
      jobTitle: { type: String, required: true },
      employer: { type: String, required: true },
      beginningTime: { type: Date, required: false },
      endingTime: { type: Date, required: false },
    }),
  ],
  certifications: [
    Schema({
      certTitle: { type: String, required: true },
      dateOfCompletion: { type: Date, required: false },
    }),
  ],
  userImage: { type: String, required: false },
});

const CV = mongoose.model("CV", CVSchema);
module.exports = CV;
