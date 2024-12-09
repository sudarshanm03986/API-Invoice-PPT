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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
// Remove the MySQL connection import if you don't want to use it
// import { connect } from './config/db';
const logger_1 = __importDefault(require("./config/logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4941;
// Remove the MySQL connection logic
// Since you're not connecting to a database, you don't need that try-catch block
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // If you're not using MySQL, simply skip this block
            // await connect(); // Remove this line
            app.listen(port, () => {
                logger_1.default.info('Listening on port: http://localhost:' + port);
            });
        }
        catch (err) {
            logger_1.default.error('Unable to start the server.');
            process.exit(1);
        }
    });
}
main().catch(err => logger_1.default.error(err));
//# sourceMappingURL=server.js.map