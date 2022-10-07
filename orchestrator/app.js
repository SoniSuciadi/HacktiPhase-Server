const { ApolloServer } = require("apollo-server");
const userSchema = require("./schemas/userSchema");

const server = new ApolloServer({
  typeDefs: [
    // appSchema.typeDefs,
    userSchema.typeDefs,
    // forumSchema.typeDefs,
    // chatSchema.typeDefs,
  ],
  resolvers: [
    // appSchema.resolvers,
    userSchema.resolvers,
    // forumSchema.resolvers,
    // chatSchema.resolvers,
  ],
  introspection: true,
  playground: true,
  context: ({ req }) => ({
    authScope: req.headers.access_token,
  }),
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log("server ready at ", url);
});
