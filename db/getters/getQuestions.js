require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const Question = require("../../api/models/Question");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function getQuestions() {
  const all = await Question.find({});

  console.log(JSON.stringify(all));

  mongoose.connection.close();

  const parent = [];
  const clinical = [];

  for (const q of await all) {
    console.log(q);
    if (q["questionnaire"] == "5fee247835e1c2536bbb0ed0") parent.push(q.id);
    else clinical.push(q.id);
  }

  console.log("PARENT:", JSON.stringify(parent));
  console.log("CLINICAL:", JSON.stringify(clinical));
}

getQuestions();
