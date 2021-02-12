require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function activateVicki() {
  const user = await User.findById("6008b8bf232ddb77f64a2f76");

  await user.sendActivationEmail();

  mongoose.connection.close();
}

activateVicki();
