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

const { GraphQLDate, GraphQLDateTime } = require("graphql-iso-date");

const Answer_Type = require("./Answer_Type");

const User = mongoose.model("User");
const Student = mongoose.model("Student");
const Response = mongoose.model("Response");

const Response_Type = new GraphQLObjectType({
  name: "Response",

  fields: () => ({
    id: { type: GraphQLID },

    datetime: { type: GraphQLDateTime },
    date: { type: GraphQLDate },

    user: {
      type: GraphQLID,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then((user) => user.id)
          .catch((err) => null);
      },
    },

    answers: {
      type: GraphQLList(Answer_Type),
      resolve(parentValue) {
        return Response.findById(parentValue.id)
          .populate("answers")
          .then((user) => user.answers);
      },
    },

    student: {
      type: GraphQLID,
      resolve(parentValue) {
        return Student.findById(parentValue.student)
          .then((student) => student.id)
          .catch((err) => null);
      },
    },
  }),
});

module.exports = Response_Type;
