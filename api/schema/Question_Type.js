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
    date: { value: "date" },
    select: { value: "select" },
    radio: { value: "radio" },
    checkbox: { value: "checkbox" },
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
      type: new GraphQLList(Answer_Type),
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
