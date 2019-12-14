import { findAuthorByBookIdsLoader } from './author';
import { findBookByIdLoader } from './book';
import { findUserByIdsLoader } from './user';
import { findReviewByBookIdsLoader } from './review';

export default () => ({
    findAuthorByBookIdsLoader: findAuthorByBookIdsLoader(),
    findBookByIdLoader: findBookByIdLoader(),
    findUserByIdsLoader: findUserByIdsLoader(),
    findReviewByBookIdsLoader: findReviewByBookIdsLoader()
});