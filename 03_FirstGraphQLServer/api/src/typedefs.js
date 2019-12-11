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
    subtitle: String!
    description: String!
    imageUrl: String!
    rating: Float
    ratingCount: Int
}
`;

export default typedefs;