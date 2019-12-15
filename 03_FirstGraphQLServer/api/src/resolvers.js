// @ts-check

import gravatar from 'gravatar';
import { allBooks, imageUrl, searchBook, createBook } from './book';
import { allReviews, createReview } from './review';

const resolvers = {
    User: {
        imageUrl: (user, { size }) => gravatar.url(user.email, { s: size }),

    },
    SearchBookResult: {
        imageUrl: (result, args) => imageUrl(args.size, result.id)
    },
    Book: {
        imageUrl: (book, { size }) => imageUrl(size, book.googleId),
        authors: (book, args, context) => {
            const { dataloaders } = context;
            const { findAuthorByBookIdsLoader } = dataloaders;
            return findAuthorByBookIdsLoader.load(book.id); // this caches the list of book ids and only queries for authors once
        },
        reviews: (book, args, { dataloaders }) => {
            const { findReviewByBookIdsLoader } = dataloaders;
            return findReviewByBookIdsLoader.load(book.id);
        }
    },
    Review: {
        book: (review, args, { dataloaders }) => {
            const { findBookByIdLoader } = dataloaders;
            return findBookByIdLoader.load(review.bookId);
        },
        user: (review, args, { dataloaders }) => {
            const { findUserByIdsLoader } = dataloaders;
            return findUserByIdsLoader.load(review.userId);
        }
    },
    Query: {
        hello: () => 'World',
        name: () => 'James',
        books: (root, args) => {
            return allBooks(args);
        },
        book: (root, args, { dataloaders }) => {
            const { findBookByIdLoader } = dataloaders;
            return findBookByIdLoader.load(args.id);
        },
        reviews: (root, args) => {
            return allReviews(args);
        },
        searchBook: (root, { query }) => {
            return searchBook(query);
        }
    },
    Mutation: {
        createReview: (root, args) => {
            const { reviewInput } = args;
            return createReview(reviewInput);
        },
        createBook: (root, args) => {
            const { googleBookId } = args;
            return createBook(googleBookId);
        }
    }
}

export default resolvers;