"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAdminByUsername = void 0;
// import { getPool } from '../../config/db';
// import Logger from '../../config/logger';
// import { ResultSetHeader } from 'mysql2'
const postgres_1 = require("@vercel/postgres");
const findAdminByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    // Logger.info(`Checking Admin exist`);
    const result = yield (0, postgres_1.sql) `SELECT * FROM admin WHERE username = ${username}`;
    // const conn = await getPool().getConnection();
    // const query = 'SELECT * FROM admin WHERE username = ?';
    // const [ rows ] = await conn.query( query, [username] );
    // await conn.release();
    // return rows[0].length === 0 ? null : rows;
    return result.rows.map((row) => {
        const admin = {
            username: row.username,
            password: row.password
        };
        return admin;
    });
});
exports.findAdminByUsername = findAdminByUsername;
//# sourceMappingURL=admin.model.js.map