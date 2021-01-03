const mongoose = require("mongoose");
const { addAnswer } = require("./Response");

const Answer = mongoose.model("Answer");

const createAnswer = async ({ value, response, question }) => {
  try {
    console.log(value, typeof value);
    const answer = await Answer.create({ value, response, question });

    console.log(answer);

    if (!answer)
      throw new Error("Something went wrong. The answer was not saved.");

    await addAnswer({
      responseId: response,
      answerId: answer.id,
    });

    return answer;
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  createAnswer,
};
