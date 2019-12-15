import { map } from 'rambda';
import query from "./db";

export async function search(term) {
    const books = await searcDb(term, 'hb.book', 'Book');
    const users = await searcDb(term, 'hb.user', 'User');
    const authors = await searcDb(term, 'hb.author', 'Author');
    const reviews = await searcDb(term, 'hb.review', 'Review');
    return [...books, ...users, ...authors, ...reviews];
}

async function searcDb(term, table, type) {
    const sql = `
        select * from ${table}
        where tokens @@ to_tsquery($1);
    `;
    try {
        const params = [term];
        const result = await query(sql, params);
        return map(obj => ({ ...obj, __type: type }), result.rows);
    } catch(err) {
        console.log(err);
        throw err;
    }
}