const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const Questionnaire = new Schema({
  type: {
    type: String,
    enum: ["parent", "clinical"],
  },

  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

module.exports = mongoose.model("Questionnaire", Questionnaire);
