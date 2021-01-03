require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;
const questions = require("../data/questions");
const Question = require("../../api/models/Question");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function createQuestions() {
  for (const question of questions) {
    await Question.create(question);
  }

  mongoose.connection.close();
}

createQuestions();
