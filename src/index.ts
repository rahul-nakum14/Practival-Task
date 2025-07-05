import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import logger from './utils/logger';
import { env } from './config/env'; 

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: env.PORT },
}).then(({ url }) => {
  logger.info(`Server starteed at ${url}`);
});
