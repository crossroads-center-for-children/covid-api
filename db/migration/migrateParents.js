const fs = require("fs").promises;

const User = require("../../api/models/User");
const P = require("./classes/Parent");

async function migrateParents(student, studentId) {
  const parentIds = [];

  let que = ["Parent1", "Parent2", "Parent3", "Parent4", "Parent5"];

  while (que.length > 0) {
    let cur = que.shift();

    const fullName = student[`${cur} Name`];
    const email = student[`${cur} Email`];
    const phone = student[`${cur} Phone`];
    const signInCode = student[`${cur} Sign-In Code`];

    if (student[`${cur} Name`]) {
      const p = new P(fullName, email, phone, signInCode);

      p.init();

      const query = {
        fullName,
        signInCode: p.signInCode,
        email,
        phone: p.phone,
      };

      try {
        let parent = await User.findOne(query);

        if (parent) {
          parent.addChild(studentId);
        } else {
          parent = new User(p);
          parent.addChild(studentId);
        }

        await parent.save();

        console.log("PARENT: ", parent);

        parentIds.push(parent.id);
      } catch (err) {
        fs.appendFile(
          "db/migration/errors/parents.log",
          `
          STUDENT: ${student["First Name"]} ${student["Last Name"]}:
          ERROR: ${cur} ===============================================
          Name: ${student[`${cur} Name`]}
          Email: ${
            student[`${cur} Email`] ? student[`${cur} Email`] : "MISSING"
          }
          Message: ${err.message}
          `
        );
      }
    }
  }

  return parentIds;
}

module.exports = migrateParents;
