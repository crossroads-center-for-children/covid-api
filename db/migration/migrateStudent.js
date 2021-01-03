const migrateParents = require("./migrateParents");

const getRoomId = require("./functions/getRoomId");
const getTagIds = require("./functions/getTagIds");

const Student = require("../../api/models/Student");

async function migrateStudent(student) {
  const room = student.Room;
  const roomId = getRoomId(room);

  const tags = student.Tags.split(",");
  const tagIds = getTagIds(tags);

  const s = new Student({
    firstName: student["First Name"],
    lastName: student["Last Name"],
    room: roomId,
    tags: tagIds,
    active: true,
  });

  const parentIds = await migrateParents(student, s.id);

  s.parents = parentIds;

  await s.save();
}

module.exports = migrateStudent;
