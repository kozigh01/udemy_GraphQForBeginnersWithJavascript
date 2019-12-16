// @ts-check

import gravatar from 'gravatar';
import { allBooks, imageUrl, searchBook, createBook, BOOK_ADDED } from './book';
import { allReviews, createReview } from './review';
import { search } from './search';
import { pubsub } from './server';

const resolvers = {
    User: {
        imageUrl: (user, { size }) => gravatar.url(user.email, { s: size }),

    },
    SearchBookResult: {
        imageUrl: (result, args) => imageUrl(args.size, result.id)
    },
    SearchResult: {
        __resolveType: obj => obj.__type
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
        books: (root, args) => {
            return allBooks(args);
        },
        book: (root, args, { dataloaders }, info) => {
            const { findBookByIdLoader } = dataloaders;
            return findBookByIdLoader.load(args.id);
        },
        reviews: (root, args) => {
            return allReviews(args);
        },
        searchBook: (root, { query }) => {
            return searchBook(query);
        },
        search: (root, args) => {
            const { query } = args;
            return search(query);
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
        }
    }
}

export default resolvers;