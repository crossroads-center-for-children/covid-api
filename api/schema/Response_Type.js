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

const User_Type = require("./User_Type");
const Answer_Type = require("./Answer_Type");
const Student_Type = require("./Student_Type");

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
      type: User_Type,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then((user) => user)
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
      type: Student_Type,
      resolve(parentValue) {
        return Student.findById(parentValue.student)
          .then((student) => student)
          .catch((err) => null);
      },
    },
  }),
});

module.exports = Response_Type;
