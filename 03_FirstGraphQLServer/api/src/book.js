// @ts-check
import query from './db';

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

export {
    allBooks,
    imageUrl
};