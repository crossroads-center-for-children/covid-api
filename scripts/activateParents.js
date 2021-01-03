require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function activateParents() {
  const parents = await User.find({ type: "parent" });

  for (const parent of parents) {
    await parent.sendActivationEmail();
  }

  mongoose.connection.close();
}

activateParents();
