const mongoose = require("mongoose");
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;

const Response_Type = require("./Response_Type");
const Question_Type = require("./Question_Type");

const Question = mongoose.model("Question");

const Answer_Type = new GraphQLObjectType({
  name: "Answer",

  fields: () => ({
    id: { type: GraphQLID },

    value: { type: GraphQLBoolean },

    response: {
      type: Response_Type,
      resolve(parentValue) {
        return Response.findById(parentValue.response)
          .then((response) => response)
          .catch((err) => null);
      },
    },

    question: {
      type: Question_Type,
      resolve(parentValue) {
        return Question.findById(parentValue.question)
          .then((question) => question)
          .catch((err) => null);
      },
    },
  }),
});

module.exports = Answer_Type;
