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

const QuestionnaireType = new GraphQLEnumType({
  name: "Questionnaire",
  values: {
    parent: { value: 0 },
    clinical: { value: 1 },
  },
});

const Question_Type = require("./Question_Type");
const Questionnaire = mongoose.model("Questionnaire");

const Questionnaire_Type = new GraphQLObjectType({
  name: "Questionnaire",

  fields: () => ({
    id: { type: GraphQLID },

    type: { type: QuestionnaireType },

    questions: {
      type: GraphQLList(Question_Type),
      resolve(parentValue) {
        return Questionnaire.findById(parentValue.id)
          .populate("questions")
          .then((user) => user.questions);
      },
    },
  }),
});

module.exports = Questionnaire_Type;
