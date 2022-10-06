const { gql } = require("apollo-server");
const axios = require("axios");
const {
  appBaseUrl,
  userBaseUrl,
  forumBaseUrl,
  chatBaseUrl,
  redis,
} = require("../config");

const typeDefs = gql`
  type Assignment {
    id: ID
    title: String
    description: String
    link: String
    dayWeek: String
    deadline: String
    scorePercentage: Int
    PhaseId: Int
    AssignmentDetail: AssignmentDetail
  }

  type AssignmentDetail {
    id: ID
    UserId: Int
    AssignmentId: Int
    score: Int
  }

  type Query {
    getAssignments: [Assignment]
  }

  # type Mutation {

  # }
`;

const resolvers = {
  Query: {
    getAssignments: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw new AuthenticationError("Forbidden");
        const findRedis = await redis.get("assignments");
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          const assignments = await axios.get(`${appBaseUrl}/assignment`, {
            headers: {
              access_token: context.authScope,
            },
          });
          return assignments.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
