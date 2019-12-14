// @ts-check
import query from './db';

async function allReviews() {
    const sql = `
    select hb.review.*
    from hb.review
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