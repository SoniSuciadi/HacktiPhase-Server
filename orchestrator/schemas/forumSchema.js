const { gql, AuthenticationError } = require("apollo-server");
const axios = require("axios");
const { GraphQLScalarType, Kind } = require("graphql");
const baseUrl = "http://localhost:3005";
const { redis } = require("../config/index");

const cacheName = "forum:thread";
const redisKey = "forum:*";

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
  type User {
    fullName: String
    email: String
    password: String
    role: String
    PhaseBatchId: Int
    expo_token: String
    status: String
  }
  type Thread {
    id: ID
    title: String
    content: String
    UserId: Int
    Comment: Comment
    createdAt: Date
    updatedAt: Date
    User: User
  }

  type Msg {
    msg: String
  }

  input threadInput {
    id: ID
    title: String
    content: String
  }

  type Comment {
    id: ID
    comment: String
    ThreadId: Int
    UserId: Int
    User: User
    createdAt: Date
    updatedAt: Date
  }
  type Thread {
    id: ID
    title: String
    content: String
    UserId: Int
    Comments: [Comment]
    createdAt: Date
    updatedAt: Date
  }

  input commentInput {
    comment: String
    ThreadId: Int
  }

  type Msg {
    msg: String
  }

  type Query {
    fetchComments: [Comment]
    fetchThreads: [Thread]
    fetchThreadById(threadId: ID): Thread
    fetchCommentById(commentId: ID): Comment
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
    fetchThreads: async (_, {}, contex) => {
      try {
        if (!contex.authScope) throw new AuthenticationError("Unauthorized");

        const { data } = await axios.get(
          `${baseUrl}/threads`,

          {
            headers: { access_token: contex.authScope },
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        return error.response.data;
      }
    },

    fetchThreadById: async (_, { threadId }, contex) => {
      try {
        if (!contex.authScope) throw new AuthenticationError("Unauthorized");
        const { data } = await axios(`${baseUrl}/threads/${threadId}`, {
          headers: { access_token: contex.authScope },
        });

        return data;
      } catch (error) {
        console.log(error);
        return error.response.data;
      }
    },
    fetchComments: async () => {
      try {
        const commentCaching = await redis.get(cacheName);

        if (commentCaching) {
          return JSON.parse(commentCaching);
        } else {
          const { data } = await axios.get(`${baseUrl}/comments`);

          await redis.set(cacheName, JSON.stringify(data));

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
  },

  Mutation: {
    createThread: async (_, { input }, contex) => {
      try {
        const { title, content } = input;
        if (!contex.authScope) throw new AuthenticationError("Unauthorized");

        const { data } = await axios.post(
          `${baseUrl}/threads`,
          {
            title,
            content,
          },
          {
            headers: { access_token: contex.authScope },
          }
        );
        console.log(data);
        return data;
      } catch (error) {
        return error.response.data;
      }
    },

    deleteThread: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${baseUrl}/threads/${id}`);

        const keys = await redis.keys(redisKey);

        await redis.del(keys);

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
        const keys = await redis.keys(redisKey);

        await redis.del(keys);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${baseUrl}/comments/${id}`);

        const keys = await redis.key(redisKey);

        await redis.del(keys);

        return data;
      } catch (error) {
        console.log(error.response.data);
        return error.response.data;
      }
    },

    createComment: async (_, { input }, contex) => {
      console.log(input, "-----");
      try {
        const { comment, ThreadId } = input;
        console.log(comment, ThreadId, "---");
        if (!contex.authScope) throw new AuthenticationError("Unauthorized");

        const { data } = await axios.post(
          `${baseUrl}/comments`,
          {
            comment,
            ThreadId,
          },
          {
            headers: { access_token: contex.authScope },
          }
        );
        console.log(data);
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

        const keys = await redis.key(redisKey);

        await redis.del(keys);

        return data;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
