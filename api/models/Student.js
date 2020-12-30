const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: { type: String, required: true },

  lastName: { type: String, required: true },

  parents: [{ type: Schema.Types.ObjectId, ref: "User" }],

  room: { type: Schema.Types.ObjectId, ref: "Room" },

  active: { type: Boolean },

  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],

  responses: [{ type: Schema.Types.ObjectId, ref: "Response" }],
});

module.exports = mongoose.model("Student", StudentSchema);
