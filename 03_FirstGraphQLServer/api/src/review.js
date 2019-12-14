// @ts-check
import query from './db';

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

export {
    allReviews
}