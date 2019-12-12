// @ts-check
import { allBooks, imageUrl } from './book';
import { authorsByBookId } from './author';

const resolvers = {
    Book: {
        imageUrl: (book, { size }) => imageUrl(size, book.googleId),
        authors: book => authorsByBookId(book.id)
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