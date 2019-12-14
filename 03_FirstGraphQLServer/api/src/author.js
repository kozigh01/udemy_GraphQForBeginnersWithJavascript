// @ts-check

import { groupBy, map } from 'rambda';
import DataLoader from 'dataloader';
import query from './db';

async function findAuthorsByBookIds(bookIds) {
    const sql = `
        select hb.author.*
        from hb.author
            inner join hb.book_author on hb.author.id = hb.book_author.author_id
        where hb.book_author.book_id = ANY($1)
    `;    
    const params = [bookIds];
    try {
        const result = await query(sql, params);
        const rowsById = groupBy(author => author.bookId, result.rows);
        return map(id => rowsById[id], bookIds);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function findAuthorByBookIdsLoader() {
    return new DataLoader(findAuthorsByBookIds);
}

async function authorsByBookId(id) {
    const sql = `
        select hb.author.*
        from hb.author
            inner join hb.book_author on hb.author.id = hb.book_author.author_id
        where hb.book_author.book_id = $1
    `;
    const params = [id];

    try {
        const result = await query(sql, params);
        return result.rows
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export {
    authorsByBookId,
    findAuthorsByBookIds,
    findAuthorByBookIdsLoader
}