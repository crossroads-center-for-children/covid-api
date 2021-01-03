require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;
const questionnaires = require("../data/questionnaires");
const Questionnaire = require("../../api/models/Questionnaire");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function createQuestionnaires() {
  for (const questionnaire of questionnaires) {
    await Questionnaire.create(questionnaire);
  }

  mongoose.connection.close();
}

createQuestionnaires();
