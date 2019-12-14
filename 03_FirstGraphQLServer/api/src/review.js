// @ts-check
import query from './db';
import DataLoader from 'dataloader';
import { groupBy, map } from 'rambda';

const ORDER_BY = {
    ID_ASC: 'id asc',
    ID_DESC: 'id desc'
}

async function allReviews(args) {
    const sql = `
        select hb.review.*
        from hb.review
        order by ${ORDER_BY[args.orderBy]}
    `;

    try {
        const result = await query(sql);
        return result.rows;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

async function findReviewByBookIds(bookIds) {
    const sql = `
        select hb.review.*
        from hb.review
        where hb.review.book_id = ANY($1)
        order by hb.review.id DESC
    `;
    const params = [bookIds];
    try {
        const result = await query(sql, params);
        const rowsById = groupBy(review => review.bookId , result.rows);
        return map(id => rowsById[id] , bookIds);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

function findReviewByBookIdsLoader() {
    return new DataLoader(findReviewByBookIds);
}

export {
    allReviews,
    findReviewByBookIdsLoader
}