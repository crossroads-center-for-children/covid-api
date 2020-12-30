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

const Response_Type = require("./Response_Type");

const Room = mongoose.model("Room");

const Student_Type = new GraphQLObjectType({
  name: "Student",

  fields: () => ({
    id: { type: GraphQLID },

    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },

    active: { type: GraphQLBoolean },

    parents: {
      type: GraphQLList(GraphQLID),
      resolve(parentValue) {
        return Student.findById(parentValue.id)
          .populate("parents")
          .then((student) => student.parents.map((parent) => parent.id));
      },
    },

    room: {
      type: GraphQLString,
      resolve(parentValue) {
        return Room.findById(parentValue.room)
          .then((room) => room.slug)
          .catch((err) => null);
      },
    },

    tags: {
      type: GraphQLList(GraphQLString),
      resolve(parentValue) {
        return Student.findById(parentValue.id)
          .populate("tags")
          .then((student) => student.tags.map((tag) => tag.tag));
      },
    },

    responses: {
      type: GraphQLList(Response_Type),
      resolve(parentValue) {
        return Student.findById(parentValue.id)
          .populate("responses")
          .then((student) => student.responses);
      },
    },
  }),
});

module.exports = Student_Type;
