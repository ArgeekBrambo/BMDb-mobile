const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

const { typeDefs: movieTypeDefs, resolvers: movieResolvers } = require("./schemas/movieSchema")
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schemas/userSchema")


const typeDefs = [movieTypeDefs, userTypeDefs]
const resolvers = [movieResolvers, userResolvers]

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  startStandaloneServer(server).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })