const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  sendActivationEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
} = require("../services/email");

require("mongoose-long")(mongoose);
const {
  Types: { Long },
} = mongoose;

const SALT_WORK_FACTOR = 10;

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  fullName: { type: String },

  email: { type: String },
  phone: { type: Long },

  type: { type: String, enum: ["parent", "clinical", "admin"] },

  password: { type: String },

  signInCode: { type: Number },

  resetPasswordToken: { type: String },

  verified: { type: Boolean },

  children: [{ type: Schema.Types.ObjectId, ref: "Student" }],

  responses: [{ type: Schema.Types.ObjectId, ref: "Response" }],

  responsesSummary: { type: Schema.Types.Mixed },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isNew) {
    const resetPasswordToken = crypto.randomBytes(64).toString("hex");

    user.resetPasswordToken = resetPasswordToken;
  }

  next();
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;

      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    cb(null, isMatch);
  });
};

UserSchema.methods.sendActivationEmail = function () {
  const user = this;

  sendActivationEmail({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    resetPasswordToken: user.resetPasswordToken,
  });
};

UserSchema.methods.addChild = function (studentId) {
  const children = this.children;
  children.push(studentId);
  this.children = children;
};

module.exports = mongoose.model("User", UserSchema);
