require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");
const Student = require("../api/models/Student");
const Room = require("../api/models/Room");
const Tag = require("../api/models/Tag");
const Questionnaire = require("../api/models/Questionnaire");
const Question = require("../api/models/Question");

const user_seeds = require("./data/users");
const student_seeds = require("./data/students");
const room_seeds = require("./data/rooms");
const tag_seeds = require("./data/tags");
const questionnaire_seeds = require("./data/questionnaires");
const question_seeds = require("./data/questions");

const entries = [
  [Student, student_seeds],
  [Room, room_seeds],
  [Tag, tag_seeds],
  [Questionnaire, questionnaire_seeds],
  [Question, question_seeds],
];
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function seed() {
  for (const [Model, seeds] of entries) {
    await Model.insertMany(seeds);
  }

  for (const user_seed of user_seeds) {
    const {
      id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
    } = user_seed;

    const user = new User({
      id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
    });

    await user.save();
  }

  mongoose.connection.close();
}

seed();
