const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  sendPasswordChangedEmail,
  sendForgotPasswordEmail,
} = require("./email");

const User = mongoose.model("User");

const keys = process.env.SECRET_OR_KEY;

const validateLoginInput = require("../validation/login");

const login = async (data) => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) throw new Error(message);

    const { email, password } = data;

    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (!user) throw new Error("There are no users with that email address");

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("Password is invalid");

    const token = jwt.sign({ id: user.id }, keys);

    const {
      id,
      firstName,
      lastName,
      fullName,
      phone,
      type,
      children,
      responses,
      responsesSummary,
    } = user;

    return {
      id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
      responses,
      responsesSummary,
      token,
      value: { success: true },
    };
  } catch (err) {
    return {
      value: { success: false, message: err.message },
    };
  }
};

const logout = async (data) => {
  try {
    const { _id } = data;

    const user = await User.findById(_id);

    if (!user) throw new Error("This user does not exist");

    const token = "";

    return { value: { success: true }, token };
  } catch (err) {
    return { success: false, err };
  }
};

const validateToken = async (data) => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys);

    const { id } = decoded;

    console.log(id);

    const user = await User.findById(id);

    if (!user) {
      throw new Error("Token is invalid.");
    }

    const {
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
      responses,
      responsesSummary,
    } = user;

    console.log("token valid", user);

    return {
      id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
      responses,
      responsesSummary,
      token,
      value: { success: true },
    };
  } catch (err) {
    return { value: { success: false, err } };
  }
};

const validateResetPasswordToken = async (data) => {
  try {
    const { token } = data;

    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      throw new Error("Token is invalid or has expired.");
    }
    return {
      id: user.id,
      value: { success: true },
    };
  } catch (err) {
    return { value: { success: false, err: { err, message: err.message } } };
  }
};

const resetPassword = async ({ resetPasswordToken, password }) => {
  try {
    const user = await User.findOne({ resetPasswordToken });
    if (!user)
      throw new Error("Reset password token is invalid or has expired.");

    user.password = password;

    await user.save();

    await sendPasswordChangedEmail({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    const token = jwt.sign({ id: user.id }, keys);

    return user;
  } catch (err) {
    return { success: false, err };
  }
};

const setPassword = async ({ resetPasswordToken, password }) => {
  try {
    const user = await User.findOne({ resetPasswordToken });
    if (!user) throw new Error("Link is invalid or has expired.");

    user.password = password;

    user.resetPasswordToken = "";

    user.verified = true;

    await user.save();

    const token = jwt.sign({ id: user.id }, keys);

    const {
      id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
      responses,
      responsesSummary,
    } = user;

    return {
      id,
      firstName,
      lastName,
      fullName,
      email,
      phone,
      type,
      children,
      responses,
      responsesSummary,
      token,
      value: { success: true },
    };
  } catch (err) {
    return { value: { success: false, err } };
  }
};

const forgotPassword = async ({ email }) => {
  try {
    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (!user) throw new Error("There are no users with that email address.");

    const resetPasswordToken = crypto.randomBytes(64).toString("hex");

    user.resetPasswordToken = resetPasswordToken;

    await user.save();

    await sendForgotPasswordEmail({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      resetPasswordToken,
    });

    return user;
  } catch (err) {
    return { success: false, err };
  }
};

module.exports = {
  login,
  logout,
  validateToken,
  validateResetPasswordToken,
  resetPassword,
  setPassword,
  forgotPassword,
};
