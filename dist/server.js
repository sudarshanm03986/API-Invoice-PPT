"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
// Remove the MySQL connection import if you don't want to use it
// import { connect } from './config/db';
// import Logger from './config/logger'
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4941;
// Remove the MySQL connection logic
// Since you're not connecting to a database, you don't need that try-catch block
dotenv_1.default.config();
app.listen(port, () => {
    // Logger.info('Listening on port: ' + port)
});
module.exports = app;
// async function main() {
//     try {
//         // If you're not using MySQL, simply skip this block
//         // await connect(); // Remove this line
//         app.listen(port, () => {
//             Logger.info('Listening on port: http://localhost:' + port)
//         });
//     } catch (err) {
//         Logger.error('Unable to start the server.')
//         process.exit(1);
//     }
// }
// main().catch(err => Logger.error(err));
//# sourceMappingURL=server.js.map