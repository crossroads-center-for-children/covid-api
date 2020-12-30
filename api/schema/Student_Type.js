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

const User_Type = require("./User_Type");
const Room_Type = require("./Room_Type");
const Tag_Type = require("./Tag_Type");
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
      type: GraphQLList(User_Type),
      resolve(parentValue) {
        return Student.findById(parentValue.id)
          .populate("parents")
          .then((student) => student.parents);
      },
    },

    room: {
      type: Room_Type,
      resolve(parentValue) {
        return Room.findById(parentValue.room)
          .then((room) => room)
          .catch((err) => null);
      },
    },

    tags: {
      type: GraphQLList(Tag_Type),
      resolve(parentValue) {
        return Student.findById(parentValue.id)
          .populate("tags")
          .then((student) => student.tags);
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
