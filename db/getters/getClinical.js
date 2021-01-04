require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const User = require("../../api/models/User");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function getClinical() {
  const all = await User.find({ type: "clinical" });

  console.log(JSON.stringify(all));

  mongoose.connection.close();
}

getClinical();
