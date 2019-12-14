// @ts-check
import { allBooks, getBook, imageUrl } from './book';
import { allReviews } from './review';
// import { authorsByBookId } from './author';

const resolvers = {
    Book: {
        imageUrl: (book, { size }) => imageUrl(size, book.googleId),
        authors: (book, args, context) => {
            const { dataloaders } = context;
            const { findAuthorByBookIdsLoader } = dataloaders;
            return findAuthorByBookIdsLoader.load(book.id); // this caches the list of book ids and only queries for authors once
            // authorsByBookId(book.id); // this is the inefficient way
        }
        // reviews: (book, args, { dataloaders })
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
        }
    }
}

export default resolvers;