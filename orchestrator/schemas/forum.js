const { gql } = require("apollo-server");
const axios = require("axios");
const { GraphQLScalarType, Kind } = require("graphql");
const baseUrl = "http://localhost:3000";
const redis = require("../config/redis");

const commentCache = "forum:comment";
const threadCache = "forum:thread";

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

  type Thread {
    id: ID
    title: String
    content: String
    UserId: Int
    createdAt: Date
    updatedAt: Date
  }

  type Msg {
    msg: String
  }

  input threadInput {
    id: ID
    title: String
    content: String
  }

  type Query {
    fetchComments: [Comment]
    fetchCommentById(commentId: ID): Comment
    fetchThreads: [Thread]
    fetchThreadById(threadId: ID): Thread
  }

  type Mutation {
    createComment(input: commentInput): Comment
    deleteComment(id: ID): Msg
    updateComment(input: commentInput): Msg
    createThread(input: threadInput): Thread
    deleteThread(id: ID): Msg
    updateThread(input: threadInput): Msg
  }
`;

const resolvers = {
  Query: {
    fetchComments: async () => {
      try {
        const commentCaching = await redis.get(commentCache);

        if (commentCaching) {
          return JSON.parse(commentCaching);
        } else {
          const { data } = await axios.get(`${baseUrl}/comments`);

          await redis.set(commentCache, JSON.stringify(data));

          return data;
        }
      } catch (error) {
        return error.response.data;
      }
    },

    fetchCommentById: async (_, { commentId }) => {
      try {
        const { data } = await axios.get(`${baseUrl}/comments/${commentId}`);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    fetchThreads: async () => {
      try {
        const threadCaching = await redis.get(threadCache);

        if (threadCaching) {
          return JSON.parse(threadCaching);
        } else {
          const { data } = await axios.get(`${baseUrl}/threads`);

          await redis.set(threadCache, JSON.stringify(data));

          return data;
        }
      } catch (error) {
        return error.response.data;
      }
    },

    fetchThreadById: async (_, { threadId }) => {
      try {
        const { data } = await axios(`${baseUrl}/threads/${threadId}`);

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

        await redis.del(commentCache);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    createComment: async (_, { input }) => {
      try {
        console.log("masuk");
        const { comment, ThreadId } = input;

        const { data } = await axios.post(`${baseUrl}/comments`, {
          comment,
          ThreadId,
        });

        await redis.del(commentCache);

        return data;
      } catch (error) {
        console.log(error);
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

        await redis.del(commentCache);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    createThread: async (_, { input }) => {
      try {
        const { title, content } = input;
        // console.log(title, content);

        const { data } = await axios.post(`${baseUrl}/threads`, {
          title,
          content,
        });

        await redis.del(threadCache);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    deleteThread: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${baseUrl}/threads/${id}`);

        await redis.del(threadCache);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    updateThread: async (_, { input }) => {
      try {
        const { id, title, content } = input;

        const { data } = await axios.put(`${baseUrl}/threads/${id}`, {
          title,
          content,
        });
        await redis.del(threadCache);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
