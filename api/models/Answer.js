const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  value: {
    type: Boolean,
    required: true,
  },
  response: {
    type: Schema.Types.ObjectId,
    ref: "Response",
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
