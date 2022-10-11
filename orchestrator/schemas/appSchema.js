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
  scalar Date
  type Material {
    id: ID
    title: String
    description: String
    session: String
    references: String
    day: Int
    week: Int
    PhaseId: Int
  }

  type Journey {
    id: ID
    title: String
    description: String
    AssignmentId: Int
    StudentJourneys: [StudentJourney]
  }

  type StudentJourney {
    id: ID
    JourneyId: Int
    UserId: Int
    status: String
  }

  type Assignment {
    id: ID
    title: String
    description: String
    link: String
    day: Int
    week: Int
    deadline: String
    scorePercentage: Int
    PhaseId: Int
    AssignmentDetail: AssignmentDetail
  }

  type Assignment2 {
    id: ID
    fullName: String
    email: String
    PhaseBatchId: Int
    status: String
    expo_token: String
    AssignmentDetails: [AssignmentDetail]
  }

  type PhaseBatch {
    id: ID
    startedAt: Date
    endAt: Date
    BatchId: Int
    PhaseId: Int
    Phase: Phase
    Batch: Batch
    Users: [User]
  }

  type Batch {
    id: ID
    batchName: String
  }

  type Phase {
    id: ID
    phase: Int
  }

  type AssignmentDetail {
    id: ID
    UserId: Int
    AssignmentId: Int
    score: Float
    User: User
  }

  type User {
    id: ID
    fullName: String
    email: String
    PhaseBatchId: Int
    status: String
    expo_token: String
  }

  type Schedule {
    Materials: [Material]
    Assignments: [Assignment]
  }

  type Query {
    getAssignments: [Assignment]
    getSingleJourney(assignmentId: ID!, userId: ID!): [Journey]
    getSingleAssignment(id: ID!): [Assignment2]
    getPhaseBatch: PhaseBatch
    getPhaseBatchByUserId: PhaseBatch
    getMaterial(week: ID!): [Material]
    getSchedule(week: ID!): Schedule
  }

  input ScoreFormat {
    id: Int!
    score: Float!
  }

  type Message {
    msg: String
  }

  type Mutation {
    gradingScore(input: [ScoreFormat], id: ID!): Message
  }
`;

const resolvers = {
  Query: {
    getAssignments: async (parent, args, context, info) => {
      try {
        await redis.flushall();
        if (!context.authScope) throw "Forbidden";
        const findRedis = await redis.get(`assignments`);
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          const assignments = await axios.get(`${appBaseUrl}/assignment`, {
            headers: {
              access_token: context.authScope,
            },
          });
          redis.set(`assignments`, JSON.stringify(assignments.data));
          return assignments.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getMaterial: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw "Forbidden";
        const findRedis = await redis.get(`material:${args.week}`);
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          const material = await axios.get(`${appBaseUrl}/material`, {
            headers: {
              access_token: context.authScope,
            },
          });
          redis.set(`material:${args.week}`, JSON.stringify(result));
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getSchedule: async (parent, args, context, info) => {
      try {
        await redis.flushall();
        let material = "";
        if (!context.authScope) throw "Forbidden";
        const findRedis = await redis.get(`material:${args.week}`);
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          material = await axios.get(
            `${appBaseUrl}/material/week/${args.week}`,
            {
              headers: {
                access_token: context.authScope,
              },
            }
          );
          redis.set(`material:${args.week}`, JSON.stringify(material.data));
        }

        const findRedis2 = await redis.get(`assignment:${args.week}`);
        if (findRedis2) {
          return JSON.parse(findRedis2);
        } else {
          const assignment = await axios.get(
            `${appBaseUrl}/assignment/week/${args.week}`,
            {
              headers: {
                access_token: context.authScope,
              },
            }
          );
          redis.set(`assignment:${args.week}`, JSON.stringify(assignment.data));
          return { Assignments: assignment.data, Materials: material.data };
        }
      } catch (error) {
        console.log(error);
      }
    },

    getSingleAssignment: async (parent, args, context, info) => {
      try {
        await redis.flushall();
        if (!context.authScope) throw "Forbidden";
        const { id } = args;
        const findRedis = await redis.get(`assignment:${id}`);
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          const assignment = await axios.get(`${appBaseUrl}/assignment/${id}`, {
            headers: {
              access_token: context.authScope,
            },
          });
          redis.set(`assignment:${id}`, JSON.stringify(assignment.data));
          return assignment.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getSingleJourney: async (parent, args, context, info) => {
      try {
        await redis.flushall();
        if (!context.authScope) throw "Forbidden";
        const { assignmentId, userId } = args;
        const findRedis = await redis.get(`journey:${assignmentId}:${userId}`);
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          const journey = await axios.get(
            `${appBaseUrl}/journey/detail/${assignmentId}/${userId}`,
            {
              headers: {
                access_token: context.authScope,
              },
            }
          );
          redis.set(
            `journey:${assignmentId}:${userId}`,
            JSON.stringify(journey.data)
          );
          return journey.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getPhaseBatch: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw "Forbidden";
        const findRedis = await redis.get("phasebatch");
        if (findRedis) {
          return JSON.parse(findRedis);
        } else {
          const phasebatch = await axios.get(`${appBaseUrl}/phasebatch`, {
            headers: {
              access_token: context.authScope,
            },
          });
          return phasebatch.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getPhaseBatchByUserId: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw "Forbidden";

        const phasebatch = await axios.get(`${appBaseUrl}/phasebatch/user`, {
          headers: {
            access_token: context.authScope,
          },
        });
        return phasebatch.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    gradingScore: async (parent, args, context, info) => {
      try {
        if (!context.authScope) throw "Forbidden";

        const { id, input } = args;
        const grading = await axios.patch(`${appBaseUrl}/assignment/${id}`, input, {
          headers: {
            access_token: context.authScope,
          },
        });
        return grading.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
