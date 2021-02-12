require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function markAdminAsVerified() {
  const admins = await User.find({ type: "admin" });

  for (const admin of admins) {
    admin.verified = true;
    await admin.save();
  }

  mongoose.connection.close();
}

markAdminAsVerified();
