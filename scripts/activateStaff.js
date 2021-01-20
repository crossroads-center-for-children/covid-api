require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function activateStaffMembers() {
  const staffMembers = await User.find({ type: "clinical" });

  for (const staffMember of staffMembers) {
    await staffMember.sendActivationEmail();
  }

  mongoose.connection.close();
}

activateStaffMembers();
