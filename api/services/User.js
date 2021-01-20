const mongoose = require("mongoose");

const User = mongoose.model("User");

const updateUser = async ({ userId, update: { response } }) => {
  try {
    console.log("userId", userId);
    const user = await User.findById(userId);
    console.log("user", user);
    if (response) {
      console.log(response);
      user.responses.push(response);
      user.markModified("responses");
    }

    await user.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateUser,
};
