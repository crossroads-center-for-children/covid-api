const map = require("../../data/maps/tags");

function getTagId(tag) {
  return map[tag.trim()];
}

module.exports = getTagId;
