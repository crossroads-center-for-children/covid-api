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

const Student_Type = require("./Student_Type");

const Tag = mongoose.model("Tag");

const Tag_Type = new GraphQLObjectType({
  name: "Tag",

  fields: () => ({
    id: { type: GraphQLID },

    tag: { type: GraphQLString },

    students: {
      type: GraphQLList(Student_Type),
      resolve(parentValue) {
        return Tag.findById(parentValue.id)
          .populate("students")
          .then((tag) => tag.students);
      },
    },
  }),
});

module.exports = Tag_Type;
