const { gql, AuthenticationError } = require("apollo-server");
const { apiChat } = require("../config/axios");
const { redis } = require("../config/index");

const typeDefs = gql`
  input Chat {
    imgUrl: String
    message: String
  }
  type User {
    _id: ID
    name: String
  }
  type post {
    message: String
  }

  type chats {
    _id: ID
    text: String
    image: String
    user: User
    createdAt: String
  }

  type Query {
    getUser: User
    getChats: [chats]
  }

  type Mutation {
    postChats(newChat: Chat): post
  }
`;
const resolvers = {
  Query: {
    getChats: async (parent, args, contex, info) => {
      try {
        redis.flushall();
        if (!contex.authScope) throw new AuthenticationError("Unauthorized");
        const chat = await redis.get("chat:getChats");
        if (!chat) {
          let { data } = await apiChat.get("/chats", {
            headers: { access_token: contex.authScope },
          });
          // redis.set("chat:getChats", JSON.stringify(data));
          return data;
        }
        return JSON.parse(chat);
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    postChats: async (_, { newChat }, contex) => {
      try {
        console.log(contex, "----");
        const { imgUrl, message } = newChat;
        if (!contex.authScope) throw new AuthenticationError("Unauthorized");
        let { data } = await apiChat.post(
          "/chats",
          { imgUrl, message },
          {
            headers: { access_token: contex.authScope },
          }
        );
        redis.del("chat:getChats");
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};

module.exports = { resolvers, typeDefs };
