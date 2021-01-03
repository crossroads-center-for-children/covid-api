const map = require("../../data/maps/rooms");

function getRoomId(slug) {
  return map[slug];
}

module.exports = getRoomId;
