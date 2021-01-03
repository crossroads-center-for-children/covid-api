const getTagId = require("./getTagId");

function getTagIds(tags) {
  const ids = [];
  for (const tag of tags) {
    const id = getTagId(tag);
    ids.push(id);
  }
  return ids;
}

module.exports = getTagIds;
