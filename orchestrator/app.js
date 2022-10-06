const { ApolloServer } = require("apollo-server");
const chatSchema = require("./schemas/chat");

const server = new ApolloServer({
  typeDefs: [chatSchema.typeDefs],
  resolvers: [chatSchema.resolvers],
  context: ({ req }) => ({ authScope: req.headers.access_token }),
});

server.listen().then(({ url }) => {
  console.log(url);
});
