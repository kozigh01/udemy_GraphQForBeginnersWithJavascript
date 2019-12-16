// @ts-check
import query from './db';
import { groupBy, map, pathOr } from 'rambda';
import stripTags from 'striptags';
import DataLoader from 'dataloader';
import axios from 'axios';

const ORDER_BY = {
    ID_DESC: 'id desc',
    RATING_DESC: 'rating desc'
}

async function allBooks(args) {
    const orderBy = ORDER_BY[args.orderBy];
    const count = args.count;
    const takeClause = count > 0 ? `limit ${count}` : '';
    const sql = `
        select * 
        from hb.book
        order by ${orderBy}
        ${takeClause};
    `;

    
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

async function searchBook(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
    try {
        const result = await axios(url);
        const items = pathOr([], ['data', 'items'], result);
        console.log(items);
        const books = map(book => ({ id: book.id, ...book.volumeInfo}), items);
        return books;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

async function createBook(googleBookId) {
    try {
        const book = await findBookByGoogleId(googleBookId);
        const {
            title = '',
            subtitle = '',
            description = '',
            authors = [],
            pageCount = 0
        } = book;
        const sql = `
            select * from hb.create_book($1, $2, $3, $4, $5, $6)
        `;
        const params = [
            googleBookId,
            stripTags(title),
            stripTags(subtitle),
            stripTags(description),
            authors,
            pageCount
        ];
        const result = await query(sql, params);
        return result.rows[0];
    } catch(err) {
        console.log(err);
        throw err;
    }
}

async function findBookByGoogleId(googleBookId) {
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookId}`;
    try {
        const result = await axios(url);
        const book = pathOr({}, ['data'], result);
        return { ...book, ...book.volumeInfo };
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export {
    allBooks,
    imageUrl,
    findBookByIdLoader,
    searchBook,
    createBook
};