// @ts-check

import express from 'express';
import http from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import cors from 'cors';
// import typeDefs from './typedefs';
import resolvers from './resolvers';
import loaders from './loader';

export const pubsub = new PubSub();

const PORT = 4000;
const app = express();
app.use(cors());

const server = new ApolloServer({ 
    typeDefs: importSchema('src/schema.graphql'), 
    resolvers,
    context: async ({ req, res}) => {
        return {
            dataloaders: loaders()
        }
    }
});
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  });
// app.listen(PORT, () => {
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// });