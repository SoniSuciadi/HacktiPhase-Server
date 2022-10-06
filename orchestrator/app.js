const { ApolloServer } = require("apollo-server");

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log("server ready at ", url);
});
