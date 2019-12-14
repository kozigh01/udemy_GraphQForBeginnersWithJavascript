// @ts-check
import query from './db';
import { groupBy, map } from 'rambda';
import DataLoader from 'dataloader';

async function allBooks() {
    const sql = `select * from hb.book;`;
    
    try {
        const result = await query(sql);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

function imageUrl(size, id) {
    const zoom = size === 'SMALL' ? 1 : 0;
    return `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&edge=curl&source=gbs_api`;
}

async function findBookById(ids) {
    const sql = `
        select hb.book.*
        from hb.book
        where hb.book.id = ANY($1)
    `;
    const params = [ids];
    try {
        const result = await query(sql, params);
        const rowsById = groupBy(book => book.id, result.rows);
        return map(id => rowsById[id] ? rowsById[id][0] : null, ids);
    } catch(err) {
        console.log(err);
        throw err;
    }
}
function findBookByIdLoader() {
    return new DataLoader(findBookById);
}

export {
    allBooks,
    imageUrl,
    findBookByIdLoader
};