const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("mongoose-long")(mongoose);
const {
  Types: { Long },
} = mongoose;

const SALT_WORK_FACTOR = 10;

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
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

  if (!user.isModified("password")) return next();

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

module.exports = mongoose.model("User", UserSchema);
