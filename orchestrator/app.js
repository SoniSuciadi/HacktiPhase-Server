const { ApolloServer } = require("apollo-server");
const appSchema = require("./schema/appSchema");
const userSchema = require("./schema/userSchema");
const forumSchema = require("./schema/forumSchema");
const chatSchema = require("./schema/chatSchema");

const server = new ApolloServer({
  typeDefs: [appSchema.typeDefs, userSchema.typeDefs, forumSchema.typeDefs, chatSchema.typeDefs],
  resolvers: [appSchema.resolvers, userSchema.resolvers, forumSchema.resolvers, chatSchema.resolvers],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
  `);
});
