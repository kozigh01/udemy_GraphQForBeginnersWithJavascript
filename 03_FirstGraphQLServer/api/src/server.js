// @ts-check

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import typeDefs from './typedefs';
import resolvers from './resolvers';

const PORT = 4000;
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});