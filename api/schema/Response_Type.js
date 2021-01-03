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

const ResponseStatus = new GraphQLEnumType({
  name: "ResponseStatus",
  values: {
    pass: { value: "pass" },
    fail: { value: "fail" },
  },
});

const Response_Type = new GraphQLObjectType({
  name: "Response",

  fields: () => ({
    id: { type: GraphQLID },

    submitted: { type: GraphQLDateTime },
    date: { type: GraphQLDate },

    user: {
      type: GraphQLString,
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then((user) => `${user.firstName} ${user.lastName}`)
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
      type: GraphQLString,
      resolve(parentValue) {
        return Student.findById(parentValue.student)
          .then((student) => `${student.firstName} ${student.lastName}`)
          .catch((err) => null);
      },
    },

    status: { type: ResponseStatus },
  }),
});

module.exports = Response_Type;
