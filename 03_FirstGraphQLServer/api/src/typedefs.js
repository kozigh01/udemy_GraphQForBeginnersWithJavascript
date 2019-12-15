// @ts-check
import { gql } from 'apollo-server-express';


const typedefs = gql`
schema {
    query: Query
    mutation: Mutation
}
type Mutation {
    createReview(reviewInput: ReviewInput!): Review
}
input ReviewInput {
    bookId: ID!
    rating: Int!
    name: String!
    email: String!
    title: String
    comment: String
}
type Query {
    hello: String!
    name: String!
    books(orderBy: BooksOrderBy = RATING_DESC): [Book!]
    book(id: ID!): Book
    reviews(orderBy: ReviewsOrderBy = ID_DESC): [Review!]
    searchBook(query: String!): [SearchBookResult!]
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
    reviews: [Review]
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
    imageUrl(size: Int = 50): String
}
type SearchBookResult {
    id: ID!
    title: String
    description: String
    authors: [String!]
    imageUrl(size: ImageSize = LARGE): String
}

enum ImageSize {
    SMALL
    LARGE
}
enum BooksOrderBy {
    RATING_DESC
    ID_DESC
}
enum ReviewsOrderBy {
    ID_ASC
    ID_DESC
}
`;

export default typedefs;