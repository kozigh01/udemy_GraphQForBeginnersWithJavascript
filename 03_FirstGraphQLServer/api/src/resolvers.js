// @ts-check
import { allBooks, imageUrl } from './book';
import { authorsByBookId } from './author';

const resolvers = {
    Book: {
        imageUrl: (book, { size }) => imageUrl(size, book.googleId),
        authors: (book, args, context) => {
            const { dataloaders } = context;
            const { findAuthorByBookIdsLoader } = dataloaders;
            return findAuthorByBookIdsLoader.load(book.id);
            // authorsByBookId(book.id);
        }
    },
    Query: {
        hello: () => 'World',
        name: () => 'James',
        books: () => {
            return allBooks();
        }
    }
}

export default resolvers;