import { findAuthorByBookIdsLoader } from './author';
import { findBookByIdLoader } from './book';
import { findUserByIdsLoader } from './user';

export default () => ({
    findAuthorByBookIdsLoader: findAuthorByBookIdsLoader(),
    findBookByIdLoader: findBookByIdLoader(),
    findUserByIdsLoader: findUserByIdsLoader()
});