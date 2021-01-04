require("dotenv").config();

const mongoose = require("mongoose");

const all = require("../data/clinical");
const User = require("../../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function createClinical() {
  for (const person of all) {
    try {
      const user = new User(person);
      await user.save();
      console.log("Saved successfully.");
    } catch (err) {
      console.log(err);
    }
  }

  mongoose.connection.close();
}

createClinical();
