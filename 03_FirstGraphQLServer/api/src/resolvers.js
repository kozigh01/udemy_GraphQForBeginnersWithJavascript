// @ts-check
import { allBooks } from './book';

const resolvers = {
    Book: {
        title: book => `A resolved title - ${book.title}`,
        description: () => 'A resolved description'
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