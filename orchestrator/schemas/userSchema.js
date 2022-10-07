const { gql } = require("apollo-server");
const axios = require("axios");
const { userBaseUrl, redis } = require("../config/redis");

const typeDefs = gql`
  type User {
    fullName: String
    email: String
    password: String
    role: String
    PhaseBatchId: Int
    expo_token: String
    status: String
  }

  input inputUser {
    fullName: String
    email: String
    password: String
    role: String
    PhaseBatchId: Int
    expo_token: String
    status: String
  }

  input inputLogin {
    email: String
    password: String
  }

  type access_token {
    access_token: String
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
  }

  type Mutation {
    register(content: inputUser): User
    login(content: inputLogin): access_token
    updateUser(content: inputUser, userId: ID!): User
    editStatus(status: String, userId: ID!): User
    deleteUser(userId: ID!): User
  }
`;

const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw new AuthenticationError("Forbidden");
        const { data } = await axios.get(`${userBaseUrl}/users`, {
          headers: {
            access_token: context.authScope,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getUser: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw new AuthenticationError("Forbidden");
        const { userId } = args;
        const { data } = await axios.get(`${userBaseUrl}/users/${userId}`, {
          headers: {
            access_token: context.authScope,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      try {
        const { content } = args;
        const { data } = await axios.post(`${userBaseUrl}/register`, content);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, args) => {
      try {
        const { content } = args;
        const { data } = await axios.post(`${userBaseUrl}/login`, content);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw new AuthenticationError("Forbidden");
        const { content, userId } = args;
        const { data } = await axios.put(`${userBaseUrl}/users/${userId}`, content, {
          headers: {
            access_token: context.authScope,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editStatus: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw new AuthenticationError("Forbidden");
        const { status, userId } = args;
        const { data } = await axios.patch(`${userBaseUrl}/users/${userId}`, status, {
          headers: {
            access_token: context.authScope,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw new AuthenticationError("Forbidden");
        const { userId } = args;
        const { data } = await axios.delete(`${userBaseUrl}/users/${userId}`, {
          headers: {
            access_token: context.authScope,
          },
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
