// @ts-check

import query from "./db";
import { groupBy, map } from "rambda";
import DataLoader from 'dataloader';

async function findUserByIds(userIds) {
    const sql = `
        select hb.user.*
        from hb.user
        where hb.user.id = ANY($1)
    `;
    const params = [ userIds ];
    try {
        const result = await query(sql, params);
        const rowsById = groupBy(user => user.id, result.rows);
        return map(id => rowsById[id] ? rowsById[id][0] : null, userIds);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

function findUserByIdsLoader() {
    return new DataLoader(findUserByIds);
}

export {
    findUserByIdsLoader
}