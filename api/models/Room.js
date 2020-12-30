const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },

  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Question", RoomSchema);
