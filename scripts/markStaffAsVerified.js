require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function markStaffAsVerified() {
  const staff = await User.find({ type: "clinical" });

  for (const person of staff) {
    person.verified = true;
    await person.save();
  }

  mongoose.connection.close();
}

markStaffAsVerified();
