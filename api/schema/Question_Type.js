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

const QuestionType = new GraphQLEnumType({
  name: "QuestionType",
  values: {
    date: { value: 0 },
    select: { value: 1 },
    radio: { value: 2 },
    checkbox: { value: 3 },
  },
});

const Answer_Type = require("./Answer_Type");
// const Questionnaire_Type = require("./Questionnaire_Type");

const Question = mongoose.model("Question");
// const Questionnaire = mongoose.model("Questionnaire");

const Question_Type = new GraphQLObjectType({
  name: "Question",

  fields: () => ({
    id: { type: GraphQLID },

    question: { type: GraphQLString },

    answers: {
      type: GraphQLList(Answer_Type),
      resolve(parentValue) {
        return Question.findById(parentValue.id)
          .populate("answers")
          .then((user) => user.answers);
      },
    },

    // questionnaire: {
    //   type: Questionnaire_Type,
    //   resolve(parentValue) {
    //     return Questionnaire.findById(parentValue.questionnaire)
    //       .then((questionnaire) => questionnaire)
    //       .catch((err) => null);
    //   },
    // },

    type: { type: QuestionType },
  }),
});

module.exports = Question_Type;
