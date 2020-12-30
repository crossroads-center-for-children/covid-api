const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const keys = process.env.SECRET_OR_KEY;

const validateLoginInput = require("../validation/login");

const login = async (data) => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) throw new Error(message);

    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) throw new Error("There are no users with that email address");

    const isValidPassword = await bcrypt.compareSync(password, user.password);

    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({ id: user.id }, keys);
    return { token, loggedIn: true, ...user._doc, password: null, id: user.id };
  } catch (err) {
    throw err;
  }
};

module.exports = { login };
