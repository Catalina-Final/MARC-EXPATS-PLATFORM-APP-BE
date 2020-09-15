const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User");
const CV = require("../models/CVs");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cleanData = async (startTime) => {
  try {
    // await User.collection.drop();
    // await Blog.collection.drop();
    // await Review.collection.drop();
    // await Reaction.collection.drop();
    // await Friendship.collection.drop();
    await mongoose.connection.dropDatabase();
    console.log("| Deleted all data");
    console.log("-------------------------------------------");
  } catch (error) {
    console.log(error);
  }
};

const generateDatabase = async () => {
  try {
    await cleanData();
    let users = [];

    console.log("| Create 10 users:");
    console.log("-------------------------------------------");

    const userNum = 10;
    const userTypes = ["client", "employer", "leasee"];
    const genderTypes = ["male", "female", "custom"];
    const degreeTypes = [
      "doctorate",
      "masters",
      "bachelors",
      "grande diploma",
      "diploma",
    ];

    for (let i = 0; i < userNum; i++) {
      await User.create({
        surname: faker.name.lastName(),
        firstName: faker.name.firstName(),
        gender: genderTypes[getRandomInt(0, 2)],
        email: faker.internet.email(),
        password: "123456",
        accType: userTypes[getRandomInt(0, 2)],
      }).then(function (user) {
        console.log("created new user " + user.firstName);
        users.push(user);
      });
    }

    console.log(users[1]._id);
    console.log(`| Each user uploads a CV`);
    console.log("-------------------------------------------");

    for (let i = 0; i < users.length; i++) {
      await CV.create({
        cvOwner: users[i]._id,
        contactInfo: {
          fullName: faker.name.findName(),
          age: getRandomInt(21, 60),
          email: faker.internet.email(),
          contactNo: faker.phone.phoneNumber(),
          nationality: faker.address.country(),
          address: {
            streetNo: getRandomInt(1, 999),
            streetName: faker.address.streetName(),
            ward: faker.address.county(),
            district: faker.address.county(),
            city: faker.address.city(),
          },
        },
        tertiaryEducation: {
          degreeType: degreeTypes[getRandomInt(0, 4)],
          field: "education",
          establishment: "University of Kek",
          year: getRandomInt(1990, 2019),
        },
        experience: {
          jobTitle: faker.name.title(),
          employer: faker.company.companyName(),
          beginningTime: faker.date.month() + " " + getRandomInt(2000, 2010),
          endingTime: faker.date.month() + " " + getRandomInt(2011, 2019),
        },
        certifications: {
          certTitle: "TEFL",
          dateOfCompletion: faker.date.past(10, "2019-01-01"),
        },
      });
    }
    console.log("| Generate Data Done");
    console.log("-------------------------------------------");
  } catch (error) {
    console.log(error);
  }
};

const getRandomCV = async (cvNum) => {
  console.log(`Get ${cvNum} random CVs`);
  const totalCvNum = await CV.countDocuments();
  for (let i = 0; i < cvNum; ++i) {
    const cv = await CV.findOne()
      .skip(getRandomInt(0, totalCvNum - 1))
      .populate("author");
    console.log(cv);
  }
};

const main = async (resetDB = false) => {
  if (resetDB) await generateDatabase();
  getRandomCV(1);
};

main(false);
