// @ts-check

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

// type defs defined using GraphQL Schema Definition Language
const typeDefs = gql`
schema {
    query: Query
}
""" root query for our **Hello World Server** """
type Query {
    """ Says hello *world* """
    hello: String!
    """
    About names:

    1. Naming is [hard](https://bit.ly/2m5uhil)
    2. Everyone messes them up
    """
    name: String!
}
`;

const resolvers = {
    Query: {
        hello: () => 'World',
        name: () => 'James'
    }
}

const PORT = 4000;
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});