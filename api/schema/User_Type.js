const mongoose = require("mongoose");
const graphql = require("graphql");
const BigInt = require("graphql-bigint");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLEnumType,
} = graphql;

const { GraphQLJSON } = require("graphql-type-json");

const Student_Type = require("./Student_Type");
const Response_Type = require("./Response_Type");

const User = mongoose.model("User");

const UserType = new GraphQLEnumType({
  name: "User",
  values: {
    parent: { value: 0 },
    clinical: { value: 1 },
    admin: { value: 2 },
  },
});

const User_Type = new GraphQLObjectType({
  name: "User",

  fields: () => ({
    id: { type: GraphQLID },

    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },

    phone: { type: BigInt },
    signInCode: { type: GraphQLInt },

    resetPasswordToken: { type: GraphQLString },
    password: { type: GraphQLString },

    type: { type: UserType },

    verified: { type: GraphQLBoolean },

    children: {
      type: GraphQLList(Student_Type),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("children")
          .then((user) => user.children);
      },
    },

    responses: {
      type: GraphQLList(Response_Type),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate("responses")
          .then((user) => user.responses);
      },
    },

    responsesSummary: { type: GraphQLJSON },
  }),
});

module.exports = User_Type;
