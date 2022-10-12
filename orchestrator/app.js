const { ApolloServer } = require("apollo-server");
const appSchema = require("./schemas/appSchema");
const userSchema = require("./schemas/userSchema");
// const forumSchema = require("./schemas/forumSchema");
const chatSchema = require("./schemas/chatSchema");
const forumSchema = require("./schemas/forumSchema");

const server = new ApolloServer({
  typeDefs: [
    appSchema.typeDefs,
    userSchema.typeDefs,
    forumSchema.typeDefs,
    chatSchema.typeDefs,
  ],
  resolvers: [
    appSchema.resolvers,
    userSchema.resolvers,
    forumSchema.resolvers,
    chatSchema.resolvers,
  ],
  introspection: true,
  playground: true,
  context: ({ req }) => ({
    authScope: req.headers.access_token,
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
  `);
});
