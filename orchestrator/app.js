const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./schemas/forum");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
