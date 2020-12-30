const graphql = require("graphql");
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require("graphql-iso-date");
const { GraphQLJSON } = require("graphql-type-json");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const User_Type = require("./schema/User_Type");

const AuthServices = require("./services/auth");

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
  },
});

module.exports = mutation;
