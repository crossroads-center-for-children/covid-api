const mongoose = require("mongoose");
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const Answer_Type = require("./Answer_Type");
const Question_Type = require("./Question_Type");
const Questionnaire_Type = require("./Questionnaire_Type");
const Response_Type = require("./Response_Type");
const Room_Type = require("./Room_Type");
const Student_Type = require("./Student_Type");
const Tag_Type = require("./Tag_Type");
const User_Type = require("./User_Type");

const Answer = mongoose.model("Answer");
const Question = mongoose.model("Question");
const Questionnaire = mongoose.model("Questionnaire");
const Response = mongoose.model("Response");
const Room = mongoose.model("Room");
const Student = mongoose.model("Student");
const Tag = mongoose.model("Tag");
const User = mongoose.model("User");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    answer: {
      type: Answer_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Answer.findById(id);
      },
    },

    question: {
      type: Question_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Question.findById(id);
      },
    },

    questionnaire: {
      type: Questionnaire_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Questionnaire.findById(id);
      },
    },

    response: {
      type: Response_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Response.findById(id);
      },
    },

    room: {
      type: Room_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Room.findById(id);
      },
    },

    student: {
      type: Student_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Student.findById(id);
      },
    },

    tag: {
      type: Tag_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Tag.findById(id);
      },
    },

    user: {
      type: User_Type,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      },
    },

    answers: {
      type: new GraphQLList(Answer_Type),
      resolve() {
        return Answer.find({});
      },
    },

    questions: {
      type: new GraphQLList(Question_Type),
      resolve() {
        return Question.find({});
      },
    },

    questionnaires: {
      type: new GraphQLList(Questionnaire_Type),
      resolve() {
        return Questionnaire.find({});
      },
    },

    responses: {
      type: new GraphQLList(Response_Type),
      resolve() {
        return Response.find({});
      },
    },

    rooms: {
      type: new GraphQLList(Room_Type),
      resolve() {
        return Room.find({});
      },
    },

    students: {
      type: new GraphQLList(Student_Type),
      resolve() {
        return Student.find({});
      },
    },

    tags: {
      type: new GraphQLList(Tag_Type),
      resolve() {
        return Tag.find({});
      },
    },

    users: {
      type: new GraphQLList(User_Type),
      resolve() {
        return User.find({});
      },
    },
  }),
});

module.exports = RootQuery;