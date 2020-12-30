const mongoose = require("mongoose");
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLEnumType,
} = graphql;

const Student_Type = require("./Student_Type");

const Room = mongoose.model("Room");

const Room_Type = new GraphQLObjectType({
  name: "Room",

  fields: () => ({
    id: { type: GraphQLID },

    slug: { type: GraphQLString },

    students: {
      type: GraphQLList(Student_Type),
      resolve(parentValue) {
        return Room.findById(parentValue.id)
          .populate("students")
          .then((room) => room.students);
      },
    },
  }),
});

module.exports = Room_Type;
