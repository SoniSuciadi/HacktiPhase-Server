const { ApolloServer } = require("apollo-server");
const { threadTypeDef, threadResolver } = require("./schemas/forum/thread");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
