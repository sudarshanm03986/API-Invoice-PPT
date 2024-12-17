// import { getPool } from '../../config/db';
// import Logger from '../../config/logger';
// import { ResultSetHeader } from 'mysql2'
import {sql} from '@vercel/postgres';

// import { Admin } from '../types/admin_types';

interface Admin {
    username: string,
    password: string
}

const findAdminByUsername = async(username : string) : Promise<Admin[]> => {

    // Logger.info(`Checking Admin exist`);

    const result = await sql`SELECT * FROM admin WHERE username = ${username}`
    // const conn = await getPool().getConnection();
    // const query = 'SELECT * FROM admin WHERE username = ?';
    // const [ rows ] = await conn.query( query, [username] );
    // await conn.release();
    // return rows[0].length === 0 ? null : rows;

    return result.rows.map((row) => {

        const admin: Admin = {
        username: row.username,
        password: row.password
        }

        return admin;
    })
}






export {findAdminByUsername}