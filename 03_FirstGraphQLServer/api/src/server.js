// @ts-check

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import cors from 'cors';
// import typeDefs from './typedefs';
import resolvers from './resolvers';
import loaders from './loader';

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

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});