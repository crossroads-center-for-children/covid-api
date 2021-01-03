require("dotenv").config();

const mongoose = require("mongoose");

const migrateStudent = require("./migrateStudent");
const all = require("../data/students-parents");
const User = require("../../api/models/User");

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function migrate() {
  const studentsWhoRideBus = all.filter((student) =>
    student.Tags.includes("Bus")
  );

  for (const student of studentsWhoRideBus) {
    try {
      await migrateStudent(student);
      console.log("Saved successfully.");
    } catch (err) {
      console.log(err);
    }
  }

  mongoose.connection.close();
}

migrate();
