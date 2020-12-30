const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },

  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],

  questionnaire: {
    type: Schema.Types.ObjectId,
    ref: "Questionnaire",
  },

  type: {
    type: String,
    enum: ["date", "select", "radio", "checkbox"],
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
