// @ts-check
import { gql } from 'apollo-server-express';


const typedefs = gql`
schema {
    query: Query
}
type Query {
    hello: String!
    name: String!
    books: [Book!]
    reviews: [Review!]
}
type Book {
    id: ID!
    title: String!
    subtitle: String!
    description: String!
    imageUrl(size: ImageSize = LARGE): String!
    rating: Float
    ratingCount: Int
    authors: [Author]
}
type Author {
    id: ID!
    name: String
}
type Review {
    id: ID!
    rating: Int!
    title: String
    comment: String
    book: Book
    user: User
}
type User {
    id: ID!
    name: String!
}

enum ImageSize {
    SMALL
    LARGE
}
`;

export default typedefs;