const { gql } = require("apollo-server");
const axios = require("axios");
const { appBaseUrl, userBaseUrl, forumBaseUrl, chatBaseUrl, redis } = require("../config");

const typeDefs = gql`

  type Query {
    
  }

  type Mutation {
    
  }
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

module.exports = { typeDefs, resolvers };
