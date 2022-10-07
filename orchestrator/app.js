const { ApolloServer } = require("apollo-server");
const {
  typeDefs: threadTypeDef,
  resolvers: threadResolver,
} = require("./schemas/forum/thread");

const {
  typeDefs: commentTypeDef,
  resolvers: commentResolver,
} = require("./schemas/forum/comment");

const server = new ApolloServer({
  typeDefs: [threadTypeDef, commentTypeDef],
  resolvers: [threadResolver, commentResolver],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
