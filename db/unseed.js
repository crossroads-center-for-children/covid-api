require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");
const Student = require("../api/models/Student");
const Room = require("../api/models/Room");
const Tag = require("../api/models/Tag");
const Questionnaire = require("../api/models/Questionnaire");
const Question = require("../api/models/Question");
const Response = require("../api/models/Response");
const Answer = require("../api/models/Answer");

const models = [
  User,
  Student,
  Room,
  Tag,
  Questionnaire,
  Question,
  Response,
  Answer,
];

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function unseed() {
  for (const Model of models) {
    await Model.deleteMany({});
  }

  mongoose.connection.close();
}

unseed();
