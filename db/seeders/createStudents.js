require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;
const students = require("../data/students");
const Student = require("../../api/models/Student");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function createStudents() {
  for (const student of students) {
    await Student.create(student);
  }

  mongoose.connection.close();
}

createStudents();
