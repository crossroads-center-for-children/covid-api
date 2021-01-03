const { v4: uuidv4 } = require("uuid");

class P {
  constructor(fullName, email, phone, signInCode) {
    this.fullName = fullName;
    this.firstName = "";
    this.lastName = "";
    this.email = email;
    this.username = email;
    this.phone = this.setPhone(phone);
    this.signInCode = this.setSignInCode(signInCode);
    this.type = "parent";
    this.verified = false;
    this.summary = {};
  }

  init(studentId) {
    this.setFirstAndLastName();
  }

  setFirstAndLastName() {
    const split = this.fullName.split(" ").filter((name) => name !== "");

    if (split.length > 2) {
      this.firstName = split[0];

      if (split[1] === "Van") {
        this.lastName = `${split[1]} ${split[2]}`;
      } else {
        this.lastName = split[2];
      }
    } else {
      this.firstName = split[0];
      this.lastName = split[1];
    }
  }

  setPhone(phone) {
    if (phone) return Number.parseInt(phone);
    return null;
  }

  setSignInCode(signInCode) {
    return Number.parseInt(signInCode);
  }
}

module.exports = P;
