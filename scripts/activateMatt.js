require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function activateMatt() {
  const matt = await User.findById("5ff1dd0e53d53f36344ad0f7");

  await matt.sendActivationEmail();

  mongoose.connection.close();
}

activateMatt();
