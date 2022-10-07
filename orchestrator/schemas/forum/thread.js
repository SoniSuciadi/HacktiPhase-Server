const { gql } = require("apollo-server");
const axios = require("axios");
const { GraphQLScalarType, Kind } = require("graphql");
const baseUrl = "http://localhost:3000";
const redis = require("../../config/redis");

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
    # books: [Book]
    fetchThreads: [Thread]
    fetchThreadById(threadId: ID): Thread
  }

  type Mutation {
    createThread(input: threadInput): Thread
    deleteThread(id: ID): Msg
    updateThread(input: threadInput): Msg
  }
`;

const resolvers = {
  Query: {
    fetchThreads: async () => {
      try {
        const threadCaching = await redis.get(cacheName);

        if (threadCaching) {
          return JSON.parse(threadCaching);
        } else {
          const { data } = await axios.get(`${baseUrl}/threads`);

          await redis.set(cacheName, JSON.stringify(data));

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
    createThread: async (_, { input }) => {
      try {
        const { title, content } = input;
        // console.log(title, content);

        const { data } = await axios.post(`${baseUrl}/threads`, {
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
  },
};

module.exports = { typeDefs, resolvers };
