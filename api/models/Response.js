const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  datetime: { type: Date },
  date: { type: Date },

  user: { type: Schema.Types.ObjectId, ref: "User" },

  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],

  student: { type: Schema.Types.ObjectId, ref: "Student" },
});

module.exports = mongoose.model("Response", ResponseSchema);
