// @ts-check

import { Pool } from 'pg';
import humps from 'humps';

const pool = new Pool({
    host: 'postgres',
    database: 'hackerbook',
    password: 'postgres',
    user: 'postgres'
});

function logQuery(sql, params) {
    console.log('BEGIN----------------------------');
    console.log('SQL::', sql);
    console.log('PARAMS::', params);
    console.log('END------------------------------');
}

async function query(sql, params) {
    const client = await pool.connect();
    logQuery(sql, params);
    try {
        const result = await client.query(sql, params);
        const rows = humps.camelizeKeys(result.rows);
        return { ...result, rows };
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export default query;