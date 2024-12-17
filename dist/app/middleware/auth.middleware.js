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
exports.authenticate = void 0;
// import Logger from "../../config/logger";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('X-Authorization');
    if (token === undefined) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.MCNA_JWT_TOKEN, (err, data) => {
            if (err) {
                res.statusMessage = "Token Is not Valid";
                res.status(403).json();
                return;
            }
            else {
                next();
            }
        });
        return;
    }
    catch (err) {
        // Logger.error(err)
        res.statusMessage = "Internal Server Error";
        res.status(500).send();
        return;
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map