const { gql } = require("apollo-server");
const axios = require("axios");
const { GraphQLScalarType, Kind } = require("graphql");
const baseUrl = "http://localhost:3000";

const Date = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const typeDefs = gql`
  scalar Date

  type Comment {
    id: ID
    comment: String
    ThreadId: Int
    UserId: Int
    createdAt: Date
    updatedAt: Date
  }

  input commentInput {
    id: ID
    comment: String
    ThreadId: Int
  }

  type Msg {
    msg: String
  }

  type Query {
    fetchComments: [Comment]
    fetchCommentById(commentId: ID): Comment
  }

  type Mutation {
    createComment(input: commentInput): Comment
    deleteComment(id: ID): Msg
    updateComment(input: commentInput): Msg
  }
`;

const resolvers = {
  Query: {
    fetchComments: async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/comments`);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    fetchCommentById: async (_, { commentId }) => {
      try {
        const { data } = await axios.get(`${baseUrl}/comments/${commentId}`);

        // console.log(data);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },

  Mutation: {
    deleteComment: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${baseUrl}/comments/${id}`);

        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },

    createComment: async (_, { input }) => {
      try {
        const { comment, ThreadId } = input;

        const { data } = await axios.post(`${baseUrl}/comments`, {
          comment,
          ThreadId,
        });

        return data;
      } catch (error) {
        // console.log(error);
        return error.response.data;
      }
    },

    updateComment: async (_, { input }) => {
      try {
        const { id, comment, ThreadId } = input;

        const { data } = await axios.put(`${baseUrl}/comments/${id}`, {
          comment,
          ThreadId,
        });

        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
