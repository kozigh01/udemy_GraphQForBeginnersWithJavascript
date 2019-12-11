// @ts-check
import { allBooks } from './book';

const resolvers = {
    Book: {
        ratingCount: book => book.rating_count
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