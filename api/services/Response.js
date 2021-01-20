const mongoose = require("mongoose");

const { updateUser } = require("./User");

const Response = mongoose.model("Response");

const createResponse = async ({ date, user, student }) => {
  try {
    console.log(user);
    const response = await Response.create({
      submitted: new Date(),
      date: new Date(date),
      user,
      student,
    });

    await updateUser({ userId: user, update: { response } });

    return response;
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};

const addAnswer = async ({ responseId, answerId }) => {
  try {
    const response = await Response.findById(responseId);

    if (!response) throw new Error("Response not found.");

    const answers = response.answers;

    answers.push(answerId);

    response.answers = answers;

    response.markModified("answers");

    await response.save();

    return response;
  } catch (err) {
    return { success: false, err };
  }
};

const updateResponse = async ({ response, update: { status } }) => {
  try {
    const res = await Response.findById(response);
    res.status = status;
    await res.save();
    return res;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createResponse,
  addAnswer,
  updateResponse,
};
