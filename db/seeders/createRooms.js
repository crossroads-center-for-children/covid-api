require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;
const rooms = require("../data/rooms");
const Room = require("../../api/models/Room");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

async function createRooms() {
  for (const room of rooms) {
    await Room.create(room);
  }

  mongoose.connection.close();
}

createRooms();
