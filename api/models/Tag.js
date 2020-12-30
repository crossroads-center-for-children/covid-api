const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  tag: { type: String, required: true, unique: true },

  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Tag", TagSchema);
