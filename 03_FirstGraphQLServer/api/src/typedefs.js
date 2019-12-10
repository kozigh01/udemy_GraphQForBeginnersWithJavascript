// @ts-check
import { gql } from 'apollo-server-express';


const typedefs = gql`
schema {
    query: Query
}
type Query {
    hello: String!
    name: String!
    books: [Book]
}
type Book {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    rating: Float
}
`;

export default typedefs;