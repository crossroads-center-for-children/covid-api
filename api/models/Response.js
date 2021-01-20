const mongoose = require("mongoose");
const { sendFailureEmail } = require("../services/email");
const User = require("./User");
const Student = require("./Student");
const Answer = require("./Answer");
const Question = require("./Question");

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  submitted: { type: Date },
  date: { type: Date },

  user: { type: Schema.Types.ObjectId, ref: "User" },

  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],

  student: { type: Schema.Types.ObjectId, ref: "Student" },

  status: {
    type: String,
    enum: ["pass", "fail"],
  },
});

ResponseSchema.pre("save", async function (next) {
  const response = this;

  if (!response.isModified("status")) {
    console.log("not modified");
    return next();
  }

  if (response.status === "fail") {
    const user = await User.findById(response.user);
    const student = await Student.findById(response.student);

    const answers = [];

    for (const answer of response.answers) {
      answers.push(
        await Answer.findById(answer).populate({
          path: "question",
          model: Question,
        })
      );
    }

    await sendFailureEmail({
      submitted: response.submitted,
      date: response.date,

      user,
      student,
      answers,
    });
  }

  next();
});

module.exports = mongoose.model("Response", ResponseSchema);
