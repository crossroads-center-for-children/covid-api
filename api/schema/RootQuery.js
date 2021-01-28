const mongoose = require("mongoose");
const graphql = require("graphql");
const { endOfDay, startOfDay } = require("date-fns");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const { GraphQLJSON } = require("graphql-type-json");

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
      args: {
        id: { type: GraphQLID },
        where: { type: GraphQLJSON },
      },
      resolve(parentValue, { id, where }) {
        if (id) return Questionnaire.findById(id);

        return Questionnaire.findOne(where);
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
      args: {
        id: { type: GraphQLID },
        where: { type: GraphQLJSON },
      },
      resolve(parentValue, { id, where }) {
        if (where) return User.findOne(where);
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
      args: {
        limit: { type: GraphQLInt },
        where: { type: GraphQLJSON },
        page: { type: GraphQLInt },
      },
      resolve(parentValue, { limit, where, page }) {
        if (limit)
          return Response.find({})
            .skip(limit * (page - 1))
            .sort({ date: -1 })
            .limit(limit);

        if (where.date === "today") {
          return Response.find({
            date: {
              $gte: startOfDay(new Date()),
              $lte: endOfDay(new Date()),
            },
          });
        }

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
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
      },
      resolve(parentValue, { limit, page }) {
        if (limit) {
          return Student.find({})
            .skip(limit * (page - 1))
            .sort({ lastName: 1 })
            .limit(limit);
        }
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
      args: {
        limit: { type: GraphQLInt },
        where: { type: GraphQLJSON },
      },
      resolve(parentValue, { limit, where }) {
        if (where && limit) return User.find(where).limit(limit);

        if (where) return User.find(where);

        if (limit) return User.find({}).limit(limit);
        return User.find({});
      },
    },
  }),
});

module.exports = RootQuery;
