require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;
const tags = require("../data/tags");
const Tag = require("../../api/models/Tag");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function createTags() {
  for (const tag of tags) {
    await Tag.create(tag);
  }

  mongoose.connection.close();
}

createTags();
