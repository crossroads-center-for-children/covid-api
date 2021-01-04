require("dotenv").config();

const mongoose = require("mongoose");

const demos = require("../db/data/users");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function activateDemoUsers() {
  for (const demo of demos) {
    const user = await User.findById(demo._id);

    await user.sendActivationEmail();
  }

  mongoose.connection.close();
}

activateDemoUsers();
