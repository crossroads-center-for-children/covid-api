const graphql = require("graphql");
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require("graphql-iso-date");
const { GraphQLJSON } = require("graphql-type-json");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = graphql;

const User_Type = require("./schema/User_Type");
const Answer_Type = require("./schema/Answer_Type");
const Response_Type = require("./schema/Response_Type");

const AuthService = require("./services/auth");
const ResponseService = require("./services/Response");
const AnswerService = require("./services/Answer");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: User_Type,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.login(args);
      },
    },

    logout: {
      type: User_Type,
      args: {
        _id: { type: GraphQLID },
      },
      resolve(_, args) {
        return AuthService.logout(args);
      },
    },

    validateToken: {
      type: User_Type,
      args: {
        token: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.validateToken(args);
      },
    },

    validateResetPasswordToken: {
      type: User_Type,
      args: {
        token: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.validateResetPasswordToken(args);
      },
    },

    resetPassword: {
      type: User_Type,
      args: {
        resetPasswordToken: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.resetPassword(args);
      },
    },

    setPassword: {
      type: User_Type,
      args: {
        resetPasswordToken: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.setPassword(args);
      },
    },

    markAsVerified: {
      type: User_Type,
      args: {
        userId: { type: GraphQLID },
      },
      resolve(_, args) {
        return UserService.markAsVerified(args);
      },
    },

    forgotPassword: {
      type: User_Type,
      args: {
        email: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.forgotPassword(args);
      },
    },

    createResponse: {
      type: Response_Type,
      args: {
        date: { type: GraphQLString },
        user: { type: GraphQLID },
        student: { type: GraphQLID },
      },
      resolve(_, args) {
        return ResponseService.createResponse(args);
      },
    },

    createAnswer: {
      type: Answer_Type,
      args: {
        value: { type: GraphQLBoolean },
        response: { type: GraphQLID },
        question: { type: GraphQLID },
      },
      resolve(_, args) {
        return AnswerService.createAnswer(args);
      },
    },

    updateResponse: {
      type: Response_Type,
      args: {
        response: { type: GraphQLID },
        update: { type: GraphQLJSON },
      },
      resolve(_, args) {
        return ResponseService.updateResponse(args);
      },
    },
  },
});

module.exports = mutation;
